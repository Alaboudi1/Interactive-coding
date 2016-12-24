import {inject} from 'aurelia-framework';
import  {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Interpreter {

  constructor(eventAggregator) {
    this.event = eventAggregator;
  }

  subscribe() {
    this.event.subscribe('onInterpreterRequest', (payload) =>{
      this.publish(payload);
    });
  }
  publish(payload) {
    this.event.publish('test', payload);
  }

}
