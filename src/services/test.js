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

  createTest(functionObject) {
    let paramValue;
    for (let testCase of functionObject.testCases) {
      for (let param of functionObject.params) {
        paramValue = this.generateValueForParamters(param.selectedType);
        testCase.paramsValue.push(paramValue);
      }
    }
    this.executeTest(functionObject);
    this.event.publish('onTestReady', functionObject);
  }

  executeTest(functionObject) {
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
      testCase.testCaseCode +=  `${functionObject.name}(${testCase.paramsName.toString()})`;
      testCase.expectedResult = this.execute(`${functionObject.code} ${testCase.testCaseCode}`);
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

  execute(code) {
    return eval(code);
  }

  ensureTest(mainMap) {
    for (let [_, functionObject] of mainMap) {
      if (functionObject.track) {
        this.executeEnsureTest(functionObject);
      }
    }
    this.mainMap = mainMap;
    this.event.publish('onTestEnsureEnds', mainMap);
  }

  executeEnsureTest(functionObject) {
    for (let testCase of functionObject.testCases) {
      testCase.result = this.execute(`${functionObject.code} ${testCase.testCaseCode}`);
      if (Array.isArray(testCase.result)) {
        testCase.pass = testCase.expectedResult.join('') === testCase.result.join('');
      } else {
        testCase.pass = testCase.expectedResult === testCase.result;
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
    this.event.subscribe('onTestCreateRequest', functionObject => { this.createTest(functionObject); });
  }
}
