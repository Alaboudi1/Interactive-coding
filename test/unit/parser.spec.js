import {Parser} from '../../src/services/parser';
import  {EventAggregator} from 'aurelia-event-aggregator';
import {code, tree} from '../../test/unit/mockModule.spec';
describe('the parser of traverse module (1 Tests)', ()=>{
  let event;
  let parser;
  let schema;

  beforeEach(() => {
    event = new EventAggregator();
    parser = new Parser(event);
    parser.subscribe(schema);
  });


  it('should parser the input code and publish a tree 1/1', done =>{
    event.subscribe('astReady', payload=>{
      expect(payload.code).toBe(code);
      expect(JSON.stringify(payload.tree)).toEqual(JSON.stringify(tree));
      done();
    });
    event.publish('onEditorChanged', code);
  }, 5000);
});
