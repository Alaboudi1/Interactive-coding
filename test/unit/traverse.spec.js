import { Traverse } from '../../src/services/traverse';
import { EventAggregator } from 'aurelia-event-aggregator';
import { code, tree } from '../../test/unit/mockModule.spec';
import { Schema } from '../../src/resources/schema';
describe('the behavior of traverse module', () => {
  let event;
  let traverse;
  let schema;
  beforeEach(() => {
    event = new EventAggregator();
    traverse = new Traverse(event);
    schema = new Schema();
    traverse.subscribe(schema);
  });


  it('should traverse the input code and publish a map object with code,name,params,location and testCases properties', done => {
    event.subscribe('onTraverseEnds', map => {
      let localObject = {
        code,
        name: 'helloWorld',
        location: tree.body[0].loc.start.line - 1,
        params: [{ name: 'message', selectedType: '' }]
      };
      expect(map.get('helloWorld')).toEqual(jasmine.objectContaining(localObject));
      done();
    });
    event.publish('astReady', { code, tree });
  });

  it('should keep the test cases added for the tracked function', done => {
    let firstTime = true;
    let localObject = {
      testCases: [{ status: 'OK', expectedResult: ['helloWorld'], pass: false, paramsName: [], paramsValue: [], actualResult: '', testCaseCode: '' }],
      status: 'tracked'
    };
    let localObjectCopy = {
      testCases: [{ status: 'OK', expectedResult: ['helloWorld'], pass: false, paramsName: [], paramsValue: [], actualResult: '', testCaseCode: '' }]
    };
    event.subscribe('onTraverseEnds', map => {
      if (firstTime) {
        map.set('helloWorld', localObject);
        firstTime = false;
        event.publish('astReady', { code, tree });
      } else {
        expect(map.get('helloWorld')).toEqual(jasmine.objectContaining(localObjectCopy));
        done();
      }
    });
    event.publish('astReady', { code, tree });
  });

  it('should remove the test cases for the untracked function', done => {
    let firstTime = true;
    let localObject = {
      testCases: [{ status: 'OK', expectedResult: ['helloWorld'], pass: false, paramsName: [], paramsValue: [], actualResult: '', testCaseCode: '' }],
      status: 'untracked'
    };
    let localObjectCopy = {
      testCases: [{ status: 'OK', expectedResult: ['helloWorld'], pass: false, paramsName: [], paramsValue: [], actualResult: '', testCaseCode: '' }]
    };
    event.subscribe('onTraverseEnds', map => {
      if (firstTime) {
        map.set('helloWorld', localObject);
        firstTime = false;
        event.publish('astReady', { code, tree });
      } else {
        expect(map.get('helloWorld')).not.toEqual(jasmine.objectContaining(localObjectCopy));
        done();
      }
    });
    event.publish('astReady', { code, tree });
  });
});
