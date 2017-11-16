import $ from 'bootstrap';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
@inject(EventAggregator)
export class Doc {
  constructor(eventAggregator) {
    this.event = eventAggregator;
    this.TDD = `
    
    function add (x,y) {
            //TODO
    }`;
    this.function = `

    function selectionSort(arr){
      var minIdx, temp, 
          len = arr.length;
      for(var i = 0; i < len; i++){
        minIdx = i;
        for(var  j = i+1; j<len; j++){
           if(arr[j] < arr[minIdx]){
              minIdx = j;
           }
        }
        temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
      }
      return arr;
    }
    `;
  }

  generateTDD() {
    this.publish('onCodeChangeRequest', {code: this.TDD});
  }
  generateFunction() {
    this.publish('onCodeChangeRequest', {code: this.function});
  }

  publish(event, publishPayload) {
    switch (event) {
    case 'onCodeChangeRequest':
      this.event.publish('onCodeChangeRequest', publishPayload);
      break;
    default:
      break;
    }
  }
}
