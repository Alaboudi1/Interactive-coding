import {inject} from 'aurelia-framework'
import esprima from 'esprima';
import {EventAggregator} from 'aurelia-event-aggregator'

@inject(EventAggregator, esprima)
export class Parser {

    constructor(eventAggregator, esprima) {
        this.event = eventAggregator;
        this.esprima = esprima;
    }




    subscribe() {
        this.event.subscribe('onEditorChanged', (payload) => {

            let tree = this.esprima.parse(payload.code, { range: true, loc: true });
            this.publish('astReady', {tree:tree, code:payload.code});
        })
    }

    publish(event, payload) {

        switch (event) {

            case 'astReady':
                this.event.publish('astReady', payload)
                break;
        }
    }

    
}   
