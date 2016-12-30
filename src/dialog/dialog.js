
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(EventAggregator, DialogController)
export class Dialog {

  constructor(event, controller) {
    this.event = event;
    this.controller = controller;
    this.functionInfo;
    this.page = 1;
    this.subscribe();
  }
  submit() {
    this.event.publish('onTestRequest', this.functionInfo);
  }
  activate(functionInfo) {
    if (functionInfo.testCases.length) {
      this.page = 3;
    }
    this.functionInfo = functionInfo;
    this.testCases = functionInfo.testCases;
  }

  subscribe() {
    this.event.subscribe('onTestReady', payload => {
      this.testCases = payload;
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
  save() {

  }
}
