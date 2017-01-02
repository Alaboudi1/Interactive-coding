import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
@inject(EventAggregator)
export class InfoSign {

  constructor(eventAggregator) {
    this.event = eventAggregator;
    this.infoSign;
  }
  attachTestSign(mainMap) {
    let annotstions = [];
    let newAnno = {};
    for (let [functionName, functionObject] of mainMap) {
      if (functionObject.sign.testCasesCount) {
        let message;
        message = functionObject.sign.errorCount ? `${functionObject.sign.errorCount} out of ${functionObject.sign.testCasesCount} test cases Fail` :
                    `All the ${functionObject.sign.testCasesCount} test cases Pass`;
        newAnno = {
          row: functionObject.location,
          column: 1,
          text: message,
          type: 'info' // also warning and information
        };
      } else {
        let message;
        message = `Function ${functionName} has not been exercised yet`;
        newAnno = {
          row: functionObject.location,
          column: 1,
          text: message,
          type: 'warning' // also warning and information
        };
      }
      annotstions.push(newAnno);
    }
    this.publish('setAnnotations', annotstions);
  }
  onTestEnsureEnds(mainMap) {
    this.createTestStatus(mainMap);
    this.attachTestSign(mainMap);
    this.publish('setBreakpointRequest', mainMap);
  }
  subscribe() {
    this.event.subscribe('onTestEnsureEnds', mainMap=>{this.onTestEnsureEnds(mainMap);});
  }
  createTestStatus(mainMap) {
    for (let [_, functionObject] of mainMap) {
      if (functionObject.track) {
        this.createTestIndicator(functionObject);
      }
    }
  }

  createTestIndicator(functionObject) {
    for (let testcase of functionObject.testCases) {
      functionObject.sign.testCasesCount++;
      if (!testcase.pass) {
        functionObject.sign.cssClass = 'error';
        functionObject.sign.errorCount++;
      }
    }
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

