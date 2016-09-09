
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(EventAggregator, DialogController)
export class Dialog {

  constructor(event, controller) {
    this.event = event;
    this.controller = controller;
    this.infoSign;

  }

  submit() {
     const types = this.infoSign[0].params.filter(item => item.selectedType !== undefined);
       if(types.length){

               this.event.publish('onTestRequest', this.infoSign);
       }else{
         window.alert('Please select types first');
       }
  }


  activate(infoSign) {
    this.infoSign = infoSign;
  }

}