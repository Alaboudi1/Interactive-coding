import {Parser} from '../../src/services/parser';
import  {EventAggregator} from 'aurelia-event-aggregator';
import {code, tree} from '../../test/unit/mockModule';
describe('the parser of traverse module', ()=>{
  let event;
  let parser;
  let schema;

  beforeEach(() => {
    event = new EventAggregator();
    parser = new Parser(event);
    parser.subscribe(schema);
  });


  it('should parser the input code and publish a tree', done =>{
    event.subscribe('astReady', payload=>{
      expect(payload.code).toBe(code);
      expect(JSON.stringify(payload.tree)).toEqual(JSON.stringify(tree));
      done();
    });
    event.publish('onEditorChanged', code);
  });
});
