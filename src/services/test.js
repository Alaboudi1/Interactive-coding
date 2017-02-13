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
        paramValue = this.generateValueForParamters(param.selectedType, param.properties);
        testCase.paramsValue.push(paramValue);
      }
    }
    this.createTestCases(functionObject);
    this.publish('onExpectedResultRequest', { mainMap });
  }
  createTestCases(functionObject) {
    let id = 0;
    for (let testCase of functionObject.testCases) {
      for (let paramsValue of testCase.paramsValue) {
        const varName = this.fakeString();
        testCase.testCaseCode += `var ${varName} =  ${JSON.stringify(paramsValue)} ;`;
        testCase.paramsName.push(`${varName}`);
      }
      testCase.testCaseCode += `${functionObject.name}(${testCase.paramsName})`;
      testCase.id = id++;
    }
    functionObject.status = 'underTesting';
  }

  generateValueForParamters(type, properties) {
    let param;
    switch (type) {
    case 'Number': {
      param = this.fakeNumber();
      break;
    }
    case 'String': {
      param = this.fakeString();
      break;
    }
    case 'Boolean': {
      param = this.fakeBoolean();
      break;
    }
    case 'Object Literal': {
      param = this.fakeObjectLiteral(properties);
      break;
    }
    default:
      param = this.fakeArray(type, 5);
    }
    return param;
  }
  ensureResult(mainMap) {
    for (let functionObject of mainMap.values()) {
      if (functionObject.status === 'tracked') {
        for (let testCase of functionObject.testCases) {
          if (Array.isArray(testCase.actualResult) && Array.isArray(testCase.expectedResult)) {
            testCase.pass = JSON.stringify(testCase.expectedResult) === JSON.stringify(testCase.actualResult);
          } else {
            testCase.pass = testCase.expectedResult === testCase.actualResult;
          }
        }
      }
    }
    this.publish('onCreateIndicatorsRequest', { mainMap });
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

  fakeArray(arryType, index) {
    let fakeArray = [];
    let type;
    switch (arryType) {
    case 'Array of Numbers': {
      type = 'Number';
      break;
    }
    case 'Array of Strings': {
      type = 'String';
      break;
    }
    case 'Array of Booleans': {
      type = 'Boolean';
      break;
    }
    default:
      break;
    }
    for (let i = 0; i < index; i++) {
      fakeArray.push(this.generateValueForParamters(type));
    }
    return fakeArray;
  }
  fakeObjectLiteral(properties) {
    let obj = {};
    for (let pro of properties) {
      obj[pro.name] = this.generateValueForParamters(pro.selectedType);
    }
    return obj;
  }

  subscribe() {
    this.event.subscribe('onActualResultDone', payload => this.ensureResult(payload.mainMap));
    this.event.subscribe('onTestCreateRequest', payload => this.createParamsValue(payload.mainMap, payload.functionName));
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
