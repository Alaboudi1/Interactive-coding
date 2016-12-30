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
    this.testCasesCollection = new Map();
  }

  onTraverseEnds(Map) {
    this.functionsInfoMap = Map;
    this.ensureTest(this.functionsInfoMap);
  }

  onDialogRequest(funcName) {
    let functionInfo = this.functionsInfoMap.get(funcName);
    this.dialogService.openAndYieldController({ viewModel: Dialog, model: functionInfo })
      .then(controller => {
        controller.result
          .then((response) => {
            if (!response.wasCancelled) {
              this.testCasesSave(response.output);
              this.ensureTest(this.functionsInfoMap);
            }
          });
      });
  }

  onTestRequest(func) { //TODO refactoring needed
    let data;
    let paramsAsValue;
    let param;
    let testCases = [];

    for (let i = 0; i < 10; i++) {
      data = {};
      paramsAsValue = [];
      data.paramsAsString = '(';
      for (let j = 0; j < func.params.length; j++) {
        param = this.paramters(func.params[j].selectedType);
        paramsAsValue.push(param);
        data.paramsAsValue = paramsAsValue;
        data.paramsAsString += j + 1 === func.params.length ? `${param}` : `${param},`;
      }
      data.paramsAsString += ')';
      this.testCall(param, func, data, testCases);
    }
    this.event.publish('onTestReady', testCases);
  }

  testCall(param, func, data, testCases) {
    let testingCode;
    if (param.length) {
      let arrayName = this.fakeString();
      testingCode = `var ${arrayName} = [ ${param} ]; ${func.name} (${arrayName})`;
    } else {
      testingCode = ` ${func.name} ${data.paramsAsString};`;
    }
    data.testingCode = testingCode;
    data.result = data.expectedResult = this.execute(`${func.code} ${testingCode}`);
    testingCode = '';
    testCases.push(data);
    testCases.name = func.name;
  }

  paramters(type) {
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

  testCasesSave(testCases) {
    let functionInfo = this.functionsInfoMap.get(testCases.name);
    functionInfo.testCases = testCases; // it adds it to the functionsInfoMap as well since it is a pointer mutable data structure.
  }

  ensureTest(functionsInfoMap) {
    for (let [key, value] of functionsInfoMap) {
      for (let item of value.testCases) {
        item.result = this.execute(`${value.code} ${item.testingCode}`);
        if (value.params[0].selectedType === 'Array of Numbers' && Array.isArray(item.result)) {
          item.pass = item.expectedResult.join('') === item.result.join('');
        } else {
          item.pass = item.expectedResult === item.result;
        }
      }
    }

    this.event.publish('onTestEnsureEnds', functionsInfoMap);
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
    this.event.subscribe('onTraverseEnds', payload => { this.onTraverseEnds(payload); });
    this.event.subscribe('onDialogRequest', payload => { this.onDialogRequest(payload); });
    this.event.subscribe('onTestRequest', payload => { this.onTestRequest(payload); });
  }
}
