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
       console.log("leak")
      let functionsInfoMap = this.traverse(payload.tree);
      this.publish('onTraverseEnds', {functionsInfoMap:functionsInfoMap, code:payload.code});
    });
  }

  publish(event, payload) {

    switch (event) {

      case 'onTraverseEnds':
        this.event.publish('onTraverseEnds', payload)
        break;
    }
  }
  traverse(code) {

     let functionInfo = new Map();
   
    this.est.traverse(code, {
      enter: function (node, parent) {
        if (node.type == 'FunctionDeclaration') {
          functionInfo.set(node.loc.start.line-1,
          {
            name:node.id.name,
            location: node.loc.start.line-1,
            params:node.params,
            testCases:[]
          });
        }
      },
 
    });
    return functionInfo;
  }
}