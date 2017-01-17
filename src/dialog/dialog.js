
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
    this.mainMap;
  }
  activate(functionName) {
    this.functionObject = this.mainMap.get(functionName);
    if (this.functionObject.status === 'tracked') {
      this.page = 3;
    }
    this.testCases = functionObject.testCases;
  }
  createTests() {
    this.functionObject.status = 'underTesting';
    this.event.publish('onTestCreateRequest', {mainMap: this.mainMap, functinName: this.functionObject.name});
  }
  saveTests() {
    this.functionObject.status = 'tracked';
    this.event.publish('onTestCreateRequest', {mainMap: this.mainMap, functinName: this.functionObject.name});
  }
  reset() {
    this.functionObject.status = 'untracked';
    this.event.publish('onRefershRequest');
    this.controller.cancel();
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
  subscribe() {
    this.event.subscribe('onTestReady', functinName => {
      this.functionObject = this.mainMap(functinName);
      this.page = 2;
    });
    this.event.subscribe('onTraverseEnds', mainMap => {this.mainMap = mainMap;});
  }
}
