import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
@inject(EventAggregator)
export class InfoSign {

  constructor(eventAggregator) {
    this.event = eventAggregator;
    this.infoSign;
  }
  attachTestSign(localFunctionsInfoMap) {
    let annotstions = [];
    let newAnno = {};
    for (let [key, value] of localFunctionsInfoMap) {
      if (value.sign.testCasesCount) {
        let message;
        message = value.sign.errorCount ? `${value.sign.errorCount} out of ${value.sign.testCasesCount} test cases Fail` :
                    `All the ${value.sign.testCasesCount} test cases Pass`;
        newAnno = {
          row: value.location,
          column: 1,
          text: message,
          type: 'info' // also warning and information
        };
      }            else {
        let message;
        message = `Function ${key} has not been exercised yet`;
        newAnno = {
          row: value.location,
          column: 1,
          text: message,
          type: 'warning' // also warning and information
        };
      }
      annotstions.push(newAnno);
    }
    this.publish('setAnnotations', annotstions);
  }
  onTestEnsureEnds(functionsInfoMap) {
    this.createTestStatus(functionsInfoMap);
    this.attachTestSign(functionsInfoMap);
    this.publish('setBreakpointRequest', functionsInfoMap);
  }
  subscribe() {
    this.event.subscribe('onTestEnsureEnds', payload=>{this.onTestEnsureEnds(payload);});
  }
  createTestStatus(functionsInfoMap) {
    let errorCount = 0;
    let testCasesCount = 0;
    let sign = {};
    let cssClass = 'noError';
    for (let [key, value] of functionsInfoMap) {
      for (let result of value.testCases) {
        testCasesCount++;
        if (!result.pass) {
          cssClass = 'error';
          errorCount++;
        }
      }
      sign = {
        errorCount: errorCount,
        testCasesCount: testCasesCount,
        cssClass
      };
      errorCount = 0;
      testCasesCount = 0;
      cssClass = 'noError';
      value.sign = sign;
      sign = {};
    }
    return functionsInfoMap;
  }


  publish(event, payload) {
    switch (event) {
    case 'setAnnotations':
      this.event.publish('setAnnotations', payload);
      break;
    case 'setBreakpointRequest':
      this.event.publish('onSetBreakpointRequest', payload);
      break;
    default:
      break;
    }
  }
}

