
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
    //  this.testCases = [];
    // this.testCase.value = this.value;
    this.subscribe();
  }
  submit() {
    // if (types.length) {
    this.event.publish('onTestRequest', this.functionInfo);
    // } else {
    //   window.alert('Please select types first');
    // }
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
    this.testCases[index].class = 'success';
  }
  danger(index) {
    this.testCases[index].class = 'danger';
  }
  warning(index) {
    this.testCases[index].class = 'warning';
  }
  save() {

  }
}
