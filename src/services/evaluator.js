import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Evaluator {


  constructor(eventAggregator) {
    this.event = eventAggregator;
    this.workers = [];
    this.reportsCount = 0;
    this.testCount = 0;
    this.reported = false;
    this.nextEvent;
    this.mainMap;
    this.currentTestTarget;
    this.exectionEnded = false;
  }

  getResult(mainMap) {
    this.mainMap = mainMap;
    for (const functionObject of mainMap.values()) {
      if (functionObject.status === this.currentTestTarget) {
        this.testCount += functionObject.testCases.length;
        for (const testCase of functionObject.testCases) {
          this.workers.push(this.createWorker(testCase.id, `${functionObject.code}${testCase.testCaseCode}`, functionObject.name));
        }
      }
    }
    this.exectionEnded = true;
    if (this.testCount === 0) {
      this.publish('onActualResultDone', {mainMap});
    } else {
      this.reset();
    }
  }

  createWorker(id, code, name) {
    const bbURL = this.webWorkerInit();
    const worker = new Worker(bbURL);

    worker.postMessage({ code, id, name });

    worker.onmessage = message => {
      const result = message.data;
      this.reportResult(result);
    };
    return { worker, bbURL };
  }

  reportResult(message) {
    if (this.currentTestTarget === 'underTesting') {
      this.mainMap.get(message.name).testCases[message.id].expectedResult = message.result;
    } else {
      this.mainMap.get(message.name).testCases[message.id].actualResult = message.result;
    }
    this.reportsCount++;
    if (this.reportsCount === this.testCount && this.exectionEnded) {
      this.reported = true;
      this.publish(this.nextEvent, {mainMap: this.mainMap, functionName: message.name});
    }
  }
  webWorkerInit() {
    const bb = new Blob([`(${this.webWrokerFunction.toString()}())`],
      {
        type: 'application/javascript'
      });
    return URL.createObjectURL(bb);
  }

  webWrokerFunction() {
    onmessage = message => {
      let result;
      const id = message.data.id;
      const name = message.data.name;
      try {
        result = eval(message.data.code);
        if (result === undefined) result = 'undefined';
      } catch (exception) {
        result = exception.message;
      }
      postMessage({ result, id, name});
    };
  }
  reset() {
    setTimeout(_ => {
      if (!this.reported) {
        this.publish(this.nextEvent, {mainMap: this.mainMap});
      }
      this.workers.forEach(ev => { ev.worker.terminate(); URL.revokeObjectURL(ev.bbURL); });
      this.reported = false;
      this.reportsCount = 0;
      this.workers = [];
      this.exectionEnded = false;
      this.testCount = 0;
    }, 1000);
  }
  subscribe() {
    this.event.subscribe('onExpectedResultRequest', payload => {
      this.nextEvent = 'onTestReady';
      this.currentTestTarget = 'underTesting';
      this.getResult(payload.mainMap);
    });
    this.event.subscribe('onTraverseEnds', payload => {
      this.nextEvent = 'onActualResultDone';
      this.currentTestTarget = 'tracked';
      this.getResult(payload.mainMap);
    });
  }
  publish(event, payload) {
    switch (event) {
    case 'onActualResultDone':
      this.event.publish('onActualResultDone', payload);
      break;
    case 'onTestReady':
      this.event.publish('onTestReady', payload);
      break;
    default:
      break;
    }
  }
}
