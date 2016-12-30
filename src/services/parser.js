import {inject} from 'aurelia-framework';
import esprima from 'esprima';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator, esprima)
export class Parser {

  constructor(eventAggregator, esp) {
    this.event = eventAggregator;
    this.esprima = esp;
  }
  parseThe(code) {
    let tree = this.esprima.parse(code, { range: true, loc: true });
    this.publish('astReady', {tree, code});
  }
  subscribe() {
    this.event.subscribe('onEditorChanged', code=>{this.parseThe(code);});
  }

  publish(event, payload) {
    switch (event) {

    case 'astReady':
      this.event.publish('astReady', payload);
      break;
    default:
      break;
    }
  }


}
