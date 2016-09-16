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
        this.event.subscribe('OnEditorChanged', (payload) => {
            let tree = this.esprima.parse(payload.code, { range: true, loc: true });
            this.publish('astReady', tree);
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