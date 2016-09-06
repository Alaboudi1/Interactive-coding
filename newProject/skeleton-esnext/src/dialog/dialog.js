
import {DialogController} from 'aurelia-dialog';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(DialogController, EventAggregator)
export class Dialog {

    constructor(controller, event) {
        this.controller = controller;
        this.event = event;
        this.infoSign;
        this.subscribe();
    }



    activate(){
      console.log(this.infoSign)
    }

     subscribe() {
        this.event.subscribe('onTraverseEnds', (payload) => {
                console.log(payload)

                this.infoSign = payload;

        });
     }
}