import { Traverse } from '../../src/services/traverse';
import { EventAggregator } from 'aurelia-event-aggregator';
import { code, tree } from '../../test/unit/mockModule.spec';
import { Schema } from '../../src/resources/schema';
describe('the behavior of traverse module (3 Tests)', () => {
  let event;
  let traverse;
  let schema;
  let localObject;
  beforeEach(() => {
    event = new EventAggregator();
    traverse = new Traverse(event);
    schema = new Schema();
    traverse.subscribe(schema);
    localObject = schema.getFunctionObject(
        code,
        tree.body[0].loc.start.line - 1,
        'helloWorld',
        [schema.getParamObject('message', '')],
        schema.getSignObject(),
        schema.testCasesFactory(10),
        'untracked'
        );
  });


  it('should traverse the input code and publish a map object with code,name,params,location and testCases properties 1/3', done => {
    event.subscribe('onTraverseEnds', payload => {
      expect(payload.mainMap.get('helloWorld')).toEqual(jasmine.objectContaining(localObject));
      done();
    });
    event.publish('astReady', { code, tree });
  });

  it('should keep the test cases added for the tracked function 2/3', done => {
    let firstTime = true;
    event.subscribe('onTraverseEnds', payload => {
      if (firstTime) {
        let testedFunctionObject = payload.mainMap.get('helloWorld');
        testedFunctionObject.testCases[0].expectedResult = 'Result';
        testedFunctionObject.status = 'tracked';
        firstTime = false;
        event.publish('astReady', { code, tree });
      } else {
        expect(payload.mainMap.get('helloWorld').testCases).toContain(jasmine.objectContaining({expectedResult: 'Result'}));
        done();
      }
    });
    event.publish('astReady', { code, tree });
  });

  it('should remove the test cases for the untracked function 3/3', done => {
    let firstTime = true;
    event.subscribe('onTraverseEnds', payload => {
      if (firstTime) {
        let testedFunctionObject = payload.mainMap.get('helloWorld');
        testedFunctionObject.testCases[0].expectedResult = 'Result';
        testedFunctionObject.status = 'untracked';
        firstTime = false;
        event.publish('astReady', { code, tree });
      } else {
        expect(payload.mainMap.get('helloWorld').testCases).not.toContain(jasmine.objectContaining({expectedResult: 'Result'}));
        done();
      }
    });
    event.publish('astReady', { code, tree });
  });
});
