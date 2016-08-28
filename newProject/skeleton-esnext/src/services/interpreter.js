import {inject} from 'aurelia-framework'
import  {EventAggregator} from 'aurelia-event-aggregator'

@inject(EventAggregator)
export class Interpreter {

    constructor(EventAggregator) {
        this.event = EventAggregator;
    }

    subscribe(){
        this.event.subscribe('onInterpreterRequest', (payload) =>{
            
            
        })
    }
}