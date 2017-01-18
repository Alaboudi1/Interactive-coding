
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
    this.subscribe();
  }
  activate(payload) {
    this.mainMap = payload.mainMap;
    this.functionObject = this.mainMap.get(payload.functionName);
    if (this.functionObject.status === 'tracked') {
      this.page = 3;
    }
    this.testCases = this.functionObject.testCases;
  }
  createTests() {
    this.functionObject.status = 'underTesting';
    this.event.publish('onTestCreateRequest', {mainMap: this.mainMap, functionName: this.functionObject.name});
  }
  saveTests() {
    this.functionObject.status = 'tracked';
    this.event.publish('onTraverseEnds', {mainMap: this.mainMap});
    this.controller.cancel();
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
  setMainMap(mainMap) {
    this.mainMap = 'mainMap';
  }
  subscribe() {
    this.event.subscribe('onTestReady', payload => {
      this.functionObject = payload.mainMap.get(payload.functionName);
      this.page = 2;
    });
  }
}
