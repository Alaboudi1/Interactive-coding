import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import faker from 'faker/locale/en';
@inject(EventAggregator)
export class Test {

  constructor(event) {
    this.event = event;
    this.mainMap;
    this.evaluators = [];
    this.reported = false;
    this.reportsCount = 0;
    this.functionObject;
  }

  onDialogRequest(functionName) {
    let functionObject = this.mainMap.get(functionName);
    this.publish('onDialoginit', functionObject);
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
    this.publish('onExpectedResultRequest', functionObject);
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

  saveTestCases(functionObject) {
    functionObject.track = true;
    this.ensureTest(this.mainMap);
  }

  subscribe() {
    this.event.subscribe('onTraverseEnds', mainMap => this.ensureTest(mainMap));
    this.event.subscribe('onDialogRequest', functionName => this.onDialogRequest(functionName));
    this.event.subscribe('onTestCreateRequest', functionObject =>  this.createParamsValue(functionObject));
    this.event.subscribe('onSaveTestCases', functionObject => this.saveTestCases(functionObject));
  }

  publish(event, payload) {
    switch (event) {
    case 'onTestEnsureEnds':
      this.event.publish('onTestEnsureEnds', payload);
      break;
    case 'onDialoginit':
      this.event.publish('onDialoginit', payload);
      break;
       case 'onExpectedResultRequest':
      this.event.publish('onExpectedResultRequest', payload);
      break;
    default:
      break;
    }
  }

  // webWorker


  //
}
