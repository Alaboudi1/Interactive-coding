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
            let tree = this.esprima.parse(payload, { range: true, loc: true });
            //    console.log(tree);
            this.publish('astReady', tree);
        })
         this.event.subscribe('OnEditorReady', (payload) => {
            let tree = this.esprima.parse(payload.getSession().getValue(), { range: true, loc: true });
            //    console.log(tree);
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
