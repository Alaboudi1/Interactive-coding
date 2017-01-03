
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(EventAggregator, DialogController)
export class Dialog {

  constructor(event, controller) {
    this.event = event;
    this.controller = controller;
    this.functionObject;
    this.page = 1;
    this.subscribe();
  }
  submit() {
    this.event.publish('onTestCreateRequest', this.functionObject);
  }
  activate(functionObject) {
    if (functionObject.track) {
      this.page = 3;
    }
    this.functionObject = functionObject;
    this.testCases = functionObject.testCases;
  }

  subscribe() {
    this.event.subscribe('onTestReady', functionObject => {
      this.functionObject = functionObject;
      this.page = 2;
    });
  }
  ok(index) {
    this.testCases[index].status = 'success';
  }
  danger(index) {
    this.testCases[index].status = 'danger';
  }
  warning(index) {
    this.testCases[index].status = 'warning';
  }
  reset() {
    this.functionObject.track = false;
    this.event.publish('onRefershRequest');
    this.controller.cancel();
  }
}
