import { inject } from 'aurelia-framework';
import estraverse from 'estraverse';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)

export class Traverse {

  constructor(eventAggregator) {
    this.event = eventAggregator;
    this.est = estraverse;
    this.NumberOfTestCases = 10;
  }

  astReady(payload) {
    const code = payload.code;
    const tree = payload.tree;
    this.mainMap = this.traverse(tree, code, this);
    this.publish('onTraverseEnds', this.mainMap);
  }
  traverse(tree, code, _this ) {
    const localMap = _this.schema.getMainMap();
    this.est.traverse(tree, {
      enter: (node, parent) => {
        if (node.type === 'FunctionDeclaration') {
          let newSign = _this.schema.getSignObject();
          let localFunctionObject = _this.mainMap.get(node.id.name);

          if (!localFunctionObject || localFunctionObject.status === 'untracked') {
            let location = node.loc.start.line - 1;
            let testCases = _this.schema.testCasesFactory(_this.NumberOfTestCases);
            let params = _this.schema.paramFactory(node.params);
            localFunctionObject = _this.schema.getFunctionObject(code, location, node.id.name, params, newSign, testCases);
          } else {
            localFunctionObject.code = code;
            localFunctionObject.location = node.loc.start.line - 1;
            localFunctionObject.sign = newSign;
            localFunctionObject.testCases = _this.schema.restingActualResult(localFunctionObject.testCases);
          }
          localMap.set(node.id.name, localFunctionObject);
        }
      }
    });
    return localMap;
  }

  subscribe(schema) {
    this.schema = schema;
    this.mainMap = this.schema.getMainMap();
    this.event.subscribe('astReady', (payload) => { this.astReady(payload); });
  }
  publish(event, payload) {
    switch (event) {

    case 'onTraverseEnds':
      this.event.publish('onTraverseEnds', payload);
      break;
    default:
      break;
    }
  }
}
