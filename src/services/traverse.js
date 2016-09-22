import {inject} from 'aurelia-framework'
import estraverse from 'estraverse';
import {EventAggregator} from 'aurelia-event-aggregator'

@inject(EventAggregator)

export class Traverse {

  constructor(eventAggregator) {
    this.event = eventAggregator;
    this.est = estraverse;
    this.functionsInfoMap = new Map();
  }

  subscribe() {

    this.event.subscribe('astReady', (payload) => {
      const code = payload.code;
      this.functionsInfoMap = this.traverse(payload.tree, code, this.functionsInfoMap);
      this.publish('onTraverseEnds', this.functionsInfoMap);
    });
  }

  publish(event, payload) {

    switch (event) {

      case 'onTraverseEnds':
        this.event.publish('onTraverseEnds', payload)
        break;
    }
  }
  traverse(tree, code, existingFunctionsInfoMap) {

    let newFunctionsInfoMap = new Map();
    let funcInfo;
    let testCases
    this.est.traverse(tree, {
      enter: function (node, parent) {
        if (node.type == 'FunctionDeclaration') {
           funcInfo = existingFunctionsInfoMap.get(node.id.name);
           testCases = [];
          if(funcInfo){
            if(funcInfo.testCases.length)
                 testCases = funcInfo.testCases;
          }
          newFunctionsInfoMap.set(node.id.name,
            {
              code,
              name: node.id.name,
              location: node.loc.start.line - 1,
              params: node.params,
              testCases
            });
        }
      }
    });
    return newFunctionsInfoMap;
  }
}