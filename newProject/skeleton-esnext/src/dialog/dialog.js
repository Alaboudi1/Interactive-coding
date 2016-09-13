
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(EventAggregator, DialogController)
export class Dialog {

  constructor(event, controller) {
    this.event = event;
    this.controller = controller;
    this.infoSign;
    this.page = 1;
    //  this.testCases = [];
    // this.testCase.value = this.value;
    this.subscribe();
  }

  submit() {
    const types = this.infoSign[0].params.filter(item => item.selectedType !== undefined);
    // if (types.length) {

      this.event.publish('onTestRequest', this.infoSign);
    // } else {
    //   window.alert('Please select types first');
    // }

  }


  activate(infoSign) {
    this.infoSign = infoSign;
  }
  subscribe() {
    this.event.subscribe("onTestReady", payload => {
      this.testCases = payload;
      this.page = 2;

    })
  }

  ok(index) {
    console.log(index);
    this.testCases[index].class= 'success';
  }
    danger(index) {
    console.log(index);
    this.testCases[index].class= 'danger';
  }
    warning(index) {
    console.log(index);
    this.testCases[index].class= 'warning';
  }


  save(){
    this.event.publish("onTestResultSaveRequest", this.testCases); 
  }
}