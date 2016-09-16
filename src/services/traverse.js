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
     Functioninfo : [],
     FunctionDeclaration: []

    }
          this.est.traverse(code,  {
            enter:  function  (node,  parent)  {
                  if  (node.type  ==  'FunctionDeclaration') {
                    info.FunctionDeclaration.push(node);
        }
            },
            leave:  function  (node,  parent)  {
                  if  (node.type  ==  'FunctionDeclaration'){
                     info.Functioninfo.push({
                            id: node.id.name,
                            location: node.loc
                     }); 

            }
        }
      });
      return info;
  }
}