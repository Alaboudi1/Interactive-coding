import {Traverse} from '../../src/services/traverse';
import  {EventAggregator} from 'aurelia-event-aggregator';
import {code, tree} from '../../test/unit/mockModule';
import {Schema} from '../../src/resources/schema';
describe('the behavior of traverse module', ()=>{
  let event;
  let traverse;
  let schema;
  beforeEach(() => {
    event = new EventAggregator();
    traverse = new Traverse(event);
    schema = new Schema();
    traverse.subscribe(schema);
  });


  it('should traverse the input code and publish a map object with code,name,params,location and testCases properties', done =>{
    event.subscribe('onTraverseEnds', map=>{
      expect(code).toBe(code);
      expect(map.get('helloWorld').name).toBe('helloWorld');
      expect(map.get('helloWorld').location).toBe(tree.body[0].loc.start.line - 1);
      expect(map.get('helloWorld').params[0].name).toBe('message');
      done();
    });
    event.publish('astReady', {code, tree});
  });

  it('should keep the test cases added for the tracked function', done =>{
    let firstTime = true;
    event.subscribe('onTraverseEnds', map=>{
      if (firstTime) {
        map.get('helloWorld').testCases[0].status = 'this is a test';
        map.get('helloWorld').track = true;

        firstTime = false;
        event.publish('astReady', {code, tree});
      }      else {
        expect(map.get('helloWorld').testCases[0].status).toBe('this is a test');
        done();
      }
    });
    event.publish('astReady', {code, tree});
  });

  it('should remove the test cases for the untracked function', done =>{
    let firstTime = true;
    event.subscribe('onTraverseEnds', map=>{
      if (firstTime) {
        map.get('helloWorld').testCases[0].status = 'this is a test';

        firstTime = false;
        event.publish('astReady', {code, tree});
      }      else {
        expect(map.get('helloWorld').testCases[0].status).not.toBe('this is a test');
        done();
      }
    });
    event.publish('astReady', {code, tree});
  });
});
