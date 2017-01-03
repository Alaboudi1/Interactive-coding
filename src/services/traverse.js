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
  traverse(tree, code, _) {
    const localMap = _.schema.getMainMap();
    this.est.traverse(tree, {
      enter: (node, parent) => {
        if (node.type === 'FunctionDeclaration') {
          let newSign = _.schema.getSignObject();
          let localFunctionObject = _.mainMap.get(node.id.name) ||  _.schema.getFunctionObject();
          localFunctionObject.code = code;
          localFunctionObject.location = node.loc.start.line - 1;
          localFunctionObject.sign = newSign;

          if (!localFunctionObject.track) {
            localFunctionObject.testCases = _.testCasesFactory(_.NumberOfTestCases);
            localFunctionObject.params =  _.paramFactory(node.params);
            localFunctionObject.name = node.id.name;
          }
          localMap.set(node.id.name, localFunctionObject);
        }
      }
    });
    return localMap;
  }

  paramFactory(newParams) {
    return  newParams.map( param => {
      return this.schema.getParamObject(param.name, param.selectedType);
    });
  }
  testCasesFactory(number) {
    const localTestCases = [];
    for (let i = 0; i < number; i++) {
      localTestCases.push(this.schema.getTestCaseObject(i));
    }
    return localTestCases;
  }
  subscribe(schema) {
    this.schema = schema;
    this.mainMap = this.schema.getMainMap();
    this.event.subscribe('astReady', (payload) => {this.astReady(payload); });
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
