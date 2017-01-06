import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
@inject(EventAggregator)
export class InfoSign {

  constructor(eventAggregator) {
    this.event = eventAggregator;
    this.infoSign;
  }
  attachTestSign(mainMap) {
    let annotstions = [];
    let newAnno = {};
    let text;
    const column = 1;
    let row;
    let type;
    for (let [functionName, functionObject] of mainMap) {
      row = functionObject.location;
      if (functionObject.track) {
        text = functionObject.sign.errorCount ? `${functionObject.sign.errorCount} out of ${functionObject.sign.testCasesCount} test cases Fail` :
          `All the ${functionObject.sign.testCasesCount} test cases Pass`;
        type = 'info'; // also warning and information
      } else {
        text = `Function ${functionName} has not been exercised yet`;
        type = 'warning'; // also warning and information
      }
      newAnno = {row, column, text, type};
      annotstions.push(newAnno);
    }
    this.publish('setAnnotations', annotstions);
  }
  onTestEnsureEnds(mainMap) {
    this.createTestStatus(mainMap);
    this.attachTestSign(mainMap);
    this.publish('onsetBreakpointRequest', mainMap);
  }

  createTestStatus(mainMap) {
    for (let functionObject of mainMap.values()) {
      if (functionObject.track) {
        this.createTestIndicator(functionObject);
      }
    }
  }

  createTestIndicator(functionObject) {
    for (let testcase of functionObject.testCases) {
      if (!testcase.pass) {
        functionObject.sign.cssClass = 'error';
        functionObject.sign.errorCount++;
      }
    }
    functionObject.sign.testCasesCount = functionObject.testCases.length;
  }

  subscribe() {
    this.event.subscribe('onTestEnsureEnds', mainMap => { this.onTestEnsureEnds(mainMap); });
  }
  publish(event, payload) {
    switch (event) {
    case 'setAnnotations':
      this.event.publish('setAnnotations', payload);
      break;
    case 'onsetBreakpointRequest':
      this.event.publish('onSetBreakpointRequest', payload);
      break;
    default:
      break;
    }
  }
}

