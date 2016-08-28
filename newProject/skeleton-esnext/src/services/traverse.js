import {inject} from 'aurelia-framework'
import estraverse from 'estraverse';
import {EventAggregator} from 'aurelia-event-aggregator'

@inject(EventAggregator)

export class Traverse {

  constructor(eventAggregator) {
    this.event = eventAggregator;
    this.est = estraverse;

  }

  subscribe() {

    this.event.subscribe('astReady', (payload) => {
      let info =  this.traverse(payload);
      this.publish('onTraverseEnds', info);
    });
  }

publish(event, payload) {

        switch (event) {

            case 'onTraverseEnds':
                this.event.publish('onTraverseEnds', payload)
                break;
        }
    }
  traverse(code){
    let info={
     NumberOfFunction : 0

    }
          this.est.traverse(code,  {
            enter:  function  (node,  parent)  {
                  if  (node.type  ==  'BlockStatement') {
                       console.log(node);
        }
            },
            leave:  function  (node,  parent)  {
          //  console.log('leave')
                  if  (node.type  ==  'FunctionDeclaration'){
                    // this.event.pusblish('onInterpreterRequest', node);
                     info.NumberOfFunction =   info.NumberOfFunction + 1; 
                     console.log(node)

            }
        }
      });
      return info;
  }
}