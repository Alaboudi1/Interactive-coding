import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DialogService} from 'aurelia-dialog';
import {Dialog} from '../dialog/dialog';
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
  onTestRequest(functionInfo) { //TODO refactoring needed
    let data;
    let paramsAsValue;
    let param;
    let testCases = [];
    let testingCode;
    for (let i = 0; i < 10; i++) {
      data = {};
      paramsAsValue = [];
      data.paramsAsString = '(';
      for (let j = 0; j < functionInfo.params.length; j++) {
        switch (functionInfo.params[j].selectedType) {
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
          param = this.fakeArray(functionInfo.params[j].selectedType, 5);
        }
        paramsAsValue.push(param);
        data.paramsAsValue = paramsAsValue;
        data.paramsAsString += j + 1 === functionInfo.params.length ? `${param}` : `${param},`;
      }
      data.paramsAsString += ')';
      if (param.length) {
        let arrayName = this.fakeString();
        testingCode = `var ${arrayName} = [ ${param} ]; ${functionInfo.name} (${arrayName})`;
      } else {
        testingCode = ` ${functionInfo.name} ${data.paramsAsString};`;
      }
      data.testingCode = testingCode;
      data.result = data.expected = this.execute(`${functionInfo.code} ${testingCode}`);
      testingCode = '';
      testCases.push(data);
    }
    testCases.name = functionInfo.name;
    this.event.publish('onTestReady', testCases);
  }

  execute(code) {
    return eval(code);
  }

  testCasesSave(testCases) {
    let functionInfo = this.functionsInfoMap.get(testCases.name);
    functionInfo.testCases = testCases; // it adds it to the functionsInfoMap as well since it is a pointer mutable data structure.
    console.log(this.functionsInfoMap);
  }

  ensureTest(functionsInfoMap) {
    for (let [key, value] of functionsInfoMap) {
      for (let item of value.testCases) {
        item.result = this.execute(`${value.code} ${item.testingCode}`);
        item.NoError = item.expected === item.result;
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
        break; }
      case 'Array of Strings': {
        fakeArray.push(`"${this.fakeString()}"`);
        break; }
      case 'Array of Booleans': {
        fakeArray.push(this.fakeBoolean());
        break; }
      default:
        break;
      }
    }
    return fakeArray;
  }

  subscribe() {
    this.event.subscribe('onTraverseEnds', payload=>{this.onTraverseEnds(payload);});
    this.event.subscribe('onDialogRequest', payload=>{this.onDialogRequest(payload);});
    this.event.subscribe('onTestRequest', payload=>{this.onTestRequest(payload);});
  }
}
