import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Evaluator {


  constructor(eventAggregator) {
    this.event = eventAggregator;
    this.workers = [];
    this.reportsCount = 0;
    this.reported = false;
    this.functionObject;
  }

  testexecution(functionObject) {
    this.functionObject = functionObject;
    for (const testCase of this.functionObject.testCases) {
      this.workers.push(this.createWorker(testCase.id, `${this.functionObject.code}${testCase.testCaseCode}`, name));
    }
    setTimeout(_ => {
      if (!this.reported) {
        this.publish('onTestReady', this.functionObject);
      }
      this.workers.forEach(ev => {ev.worker.terminate(); URL.revokeObjectURL(ev.bbURL);});
      this.reported = false;
      this.reportsCount = 0;
      this.workers = [];
    }, 1000);
  }

  createWorker(id, code, name) {
    const bbURL = this.webWorkerInit();
    const worker = new Worker(bbURL);

    worker.postMessage({ code, name, id });

    worker.onmessage = message => {
      const result = message.data;
      this.reportResult(result);
    };
    return {worker, bbURL};
  }

  reportResult(message) {
    this.functionObject.testCases[message.id].expectedResult = message.result;
    this.reportsCount++;
    if (this.reportsCount === this.functionObject.testCases.length) {
      this.reported = true;
      this.publish('onTestReady', this.functionObject);
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
    onmessage = message =>{
      let result; let name = message.data.name;
      let id = message.data.id;
      try {
        result = eval(message.data.code);
        if (result === undefined) result = 'undefined';
      } catch (exception) {
        result = exception.message;
      }
      postMessage({result, name, id});
    };
  }

  subscribe() {
    this.event.subscribe('onExpectedResultRequest', functionObject => this.testexecution(functionObject));
  }
  publish(event, payload) {
    switch (event) {
    case 'onTestEnsureEnds':
      this.event.publish('onTestEnsureEnds', payload);
      break;
    case 'onTestReady':
      this.event.publish('onTestReady', payload);
      break;
    default:
      break;
    }
  }
}
