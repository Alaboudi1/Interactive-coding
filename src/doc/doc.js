import $ from 'bootstrap';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
@inject(EventAggregator)
export class Doc {
  constructor(eventAggregator) {
    this.event = eventAggregator;
    this.TDD = `
    
    function add (x,y) {
            //TODO
    }`;
    this.function = `

    function mult (x,y) {
        return x*y;
    }`;
  }

  generateTDD() {
    this.publish('onCodeChangeRequest', {code: this.TDD});
  }
  generateFunction() {
    this.publish('onCodeChangeRequest', {code: this.function});
  }

  publish(event, publishPayload) {
    switch (event) {
    case 'onCodeChangeRequest':
      this.event.publish('onCodeChangeRequest', publishPayload);
      break;
    default:
      break;
    }
  }
}
