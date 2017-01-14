import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { DialogService } from 'aurelia-dialog';
import { Dialog } from '../dialog/dialog';
import faker from 'faker/locale/en';
@inject(EventAggregator, DialogService)
export class Test {

  constructor(event, dialogService) {
    this.event = event;
    this.dialogService = dialogService;
    this.mainMap;
    this.evaluators = [];
    this.reported = false;
    this.reportsCount = 0;
    this.functionObject;
  }

  onDialogRequest(functionName) {
    let functionObject = this.mainMap.get(functionName);
    this.dialogService.openAndYieldController({ viewModel: Dialog, model: functionObject })
      .then(controller => {
        controller.result
          .then((response) => {
            if (!response.wasCancelled) {
              response.output.track = true;
              this.ensureTest(this.mainMap);
            }
          });
      });
  }

  createParamsValue(functionObject) {
    this.functionObject = functionObject;
    let paramValue;
    for (let testCase of functionObject.testCases) {
      for (let param of functionObject.params) {
        paramValue = this.generateValueForParamters(param.selectedType);
        testCase.paramsValue.push(paramValue);
      }
    }
    this.createTestCases(functionObject);

    setTimeout(_ => {
      if (!this.reported) {
        this.publish('onTestReady', this.functionObject);
      }
      this.evaluators.forEach(ev => ev.terminate());
      this.reported = false;
      this.reportsCount = 0;
    }, 1000);
  }
  createTestCases(functionObject) {
    let id = 0;
    for (let testCase of functionObject.testCases) {
      for (let paramsValue of testCase.paramsValue) {
        if (Array.isArray(paramsValue)) {
          const arrayName = this.fakeString();
          testCase.testCaseCode += `var ${arrayName} = [ ${paramsValue.toString()} ];`;
          testCase.paramsName.push(`${arrayName}`);
        } else {
          testCase.paramsName.push(`${paramsValue}`);
        }
      }
      testCase.testCaseCode += `${functionObject.name}(${testCase.paramsName.toString()})`;
      testCase.id = id++;
      this.execute(`${functionObject.code} ${testCase.testCaseCode}`, testCase.id);
    }
  }

  generateValueForParamters(type) {
    let param;
    switch (type) {
      case 'Number': {
        param = this.fakeNumber();
        break;
      }
      case 'String': {
        param = `"${this.fakeString()}"`;
        break;
      }
      case 'Boolean': {
        param = this.fakeBoolean();
        break;
      }
      default:
        param = this.fakeArray(type, 5);
    }
    return param;
  }

  execute(code, id, name = this.functionObject.name) {
    let bb = new Blob([`
        onmessage = message =>{
          let result;let name = message.data.name;
          let id = message.data.id;
          try {result = eval(message.data.code);}
          catch (exception) {result = exception.message;}
          postMessage({result, name, id});}`],
      {
        type: 'text/javascript'
      });

    // convert the blob into a pseudo URL
    let bbURL = URL.createObjectURL(bb);
    let evaluator = new Worker(bbURL);
    evaluator.postMessage({ code, name, id }

    );
    evaluator.onmessage = message => {
      const result = message.data;
      URL.revokeObjectURL(bbURL);
      this.setResult(result);
    };
    this.evaluators.push(evaluator);
  }
  setResult(result) {
    this.functionObject.testCases[result.id].expectedResult = result.result;
    this.reportsCount++;
    if (this.reportsCount === this.functionObject.testCases.length) {
      this.reported = true;
      this.publish('onTestReady', this.functionObject);
    }
  }
  ensureTest(mainMap) {
    for (let functionObject of mainMap.values()) {
      if (functionObject.track) {
        this.executeEnsureTest(functionObject);
      }
    }
    this.mainMap = mainMap;
    this.publish('onTestEnsureEnds', mainMap);
  }

  evals(code) {
    return eval(code);
  }
  executeEnsureTest(functionObject) {
    for (let testCase of functionObject.testCases) {
      testCase.actualResult = this.evals(`${functionObject.code} ${testCase.testCaseCode}`);
      if (Array.isArray(testCase.actualResult) && Array.isArray(testCase.expectedResult)) {
        testCase.pass = testCase.expectedResult.join('') === testCase.actualResult.join('');
      } else {
        testCase.pass = testCase.expectedResult === testCase.actualResult;
      }
    }
  }

  fakeNumber() {
    return faker.random.number({
      min: -10,
      max: 10
    });
  }

  fakeString() {
    return faker.name.firstName();
  }

  fakeBoolean() {
    return faker.random.boolean();
  }

  fakeArray(type, index) {
    let fakeArray = [];
    for (let i = 0; i < index; i++) {
      switch (type) {
        case 'Array of Numbers': {
          fakeArray.push(this.fakeNumber());
          break;
        }
        case 'Array of Strings': {
          fakeArray.push(`"${this.fakeString()}"`);
          break;
        }
        case 'Array of Booleans': {
          fakeArray.push(this.fakeBoolean());
          break;
        }
        default:
          break;
      }
    }
    return fakeArray;
  }

  subscribe() {
    this.event.subscribe('onTraverseEnds', mainMap => { this.ensureTest(mainMap); });
    this.event.subscribe('onDialogRequest', functionName => { this.onDialogRequest(functionName); });
    this.event.subscribe('onTestCreateRequest', functionObject => { this.createParamsValue(functionObject); });
  }

  publish(event, payload) {
    switch (event) {
      case 'onTestEnsureEnds':
        this.event.publish('onTestEnsureEnds', payload);
        break;
      case 'onTestReady':
        this.event.publish('onTestReady', payload);
        break;
      default:
        break;
    }
  }
}
