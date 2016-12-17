import {inject} from 'aurelia-framework';
import  {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Interpreter {

  constructor(eventAggregator) {
    this.event = eventAggregator;
  }

  subscribe() {
    this.event.subscribe('onInterpreterRequest', (payload) =>{


    });
  }
}
