import {inject} from 'aurelia-framework';
import esprima from 'esprima';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator, esprima)
export class Parser {

  constructor(eventAggregator, esp) {
    this.event = eventAggregator;
    this.esprima = esp;
  }
  onEditorChanged(payload) {
    let tree = this.esprima.parse(payload.code, { range: true, loc: true });
    this.publish('astReady', {tree: tree, code: payload.code});
  }
  subscribe() {
    this.event.subscribe('onEditorChanged', payload=>{this.onEditorChanged(payload);});
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
