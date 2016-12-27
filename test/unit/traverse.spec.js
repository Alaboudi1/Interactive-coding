import {Traverse} from '../../src/services/traverse';
import  {EventAggregator} from 'aurelia-event-aggregator';
import {code, tree} from '../../test/unit/mockModule';

describe('the behavior of traverse module', ()=>{
  const event = new EventAggregator();
  const traverse = new Traverse(event);

  it('should traverse the input code and publish a map object with code,name,params,location and testCases properties', done=>{
    traverse.subscribe();
    event.subscribe('onTraverseEnds', map=>{
      expect(map.get('helloWorld').code).toBe(code);
      expect(map.get('helloWorld').name).toBe(tree.body[0].id.name);
      expect(map.get('helloWorld').location).toBe(tree.body[0].loc.start.line - 1);
      expect(map.get('helloWorld').params).toBe(tree.body[0].params);
      done();
    });
    event.publish('astReady', {code, tree});
  });

  it('should keep the test cases added by the user', done =>{
    traverse.subscribe();
    let firstTime = true;
    event.subscribe('onTraverseEnds', map=>{
      if (firstTime) {
        map.get('helloWorld').testCases[0] = 'This is a test';
        firstTime = false;
        event.publish('astReady', {code, tree});
      }      else {
        expect(map.get('helloWorld').testCases[0]).toBe('This is a test');
        done();
      }
    });
    event.publish('astReady', {code, tree});
  });
});
