import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import faker from 'faker/locale/en';
@inject(EventAggregator)
export class Test {

  constructor(event) {
    this.event = event;
  }

  createParamsValue(mainMap, functionName) {
    const functionObject = mainMap.get(functionName);
    let paramValue;
    for (let testCase of functionObject.testCases) {
      for (let param of functionObject.params) {
        paramValue = this.generateValueForParamters(param.selectedType);
        testCase.paramsValue.push(paramValue);
      }
    }
    this.createTestCases(functionObject);
    this.publish('onExpectedResultRequest', {mainMap});
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
    functionObject.status = 'underTesting';
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
  ensureResult(mainMap) {
    for (let functionObject of mainMap.values()) {
      if ( functionObject.status === 'tracked') {
        for (let testCase of functionObject.testCases) {
          if (Array.isArray(testCase.actualResult) && Array.isArray(testCase.expectedResult)) {
            testCase.pass = testCase.expectedResult.join('') === testCase.actualResult.join('');
          } else {
            testCase.pass = testCase.expectedResult === testCase.actualResult;
          }
        }
      }
    }
    this.publish('onCreateIndicatorsRequest', {mainMap});
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
    this.event.subscribe('onActualResultDone', payload => this.ensureResult(payload.mainMap));
    this.event.subscribe('onTestCreateRequest', payload =>  this.createParamsValue(payload.mainMap, payload.functionName));
  }

  publish(event, payload) {
    switch (event) {
    case 'onCreateIndicatorsRequest':
      this.event.publish('onCreateIndicatorsRequest', payload);
      break;
    case 'onExpectedResultRequest':
      this.event.publish('onExpectedResultRequest', payload);
      break;
    default:
      break;
    }
  }
}
