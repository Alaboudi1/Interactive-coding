import { Evaluator } from '../../src/services/evaluator';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Schema } from '../../src/resources/schema';
import { code } from '../../test/unit/mockModule.spec';


describe('the behavior of evaluator module ', () => {
  describe('regarding evaluating code with infinite result', () => {
    let event;
    let evaluator;
    let schema;
    let functionObject;
    let mainMap;

    beforeEach(() => {
      event = new EventAggregator();
      evaluator = new Evaluator(event);
      schema = new Schema();
      mainMap = schema.getMainMap();
      functionObject = schema.getFunctionObject();
      functionObject.code = code;
      functionObject.name = 'helloWorld';
      evaluator.subscribe();
    });

    it('should populate expectedResult with Array of Strings when the selectedType is Array of String 1/6', done => {
      functionObject.testCases.push(schema.getTestCaseObject(0, '', [], false, [], [], [], 'let array =[`one`, `two`]; helloWorld(array);'));
      functionObject.status = 'underTesting';
      mainMap.set('helloWorld', functionObject);
      event.subscribe('onTestReady', payload => {
        let testCase = payload.mainMap.get('helloWorld').testCases;
        expect(testCase.pop().expectedResult).toContain(jasmine.any(String));
        done();
      });
      event.publish('onExpectedResultRequest', {mainMap});
    });

    it('should populate expectedResult with array of numbers when the selectedType is Array of Numbers #2', done => {
      functionObject.testCases.push(schema.getTestCaseObject(0, '', [], false, [], [], [], 'let array =[1, 2]; helloWorld(array);'));
      functionObject.status = 'underTesting';
      mainMap.set('helloWorld', functionObject);
      event.subscribe('onTestReady', payload => {
        let testCase = payload.mainMap.get('helloWorld').testCases;
        expect(testCase.pop().expectedResult).toContain(jasmine.any(Number));
        done();
      });
      event.publish('onExpectedResultRequest', {mainMap});
    });

    it('should populate testCaseCode, paramsName, paramsValue properties when the selectedType is Array of Boolean #3', done => {
      functionObject.testCases.push(schema.getTestCaseObject(0, '', [], false, [], [], [], 'let array =[true, false]; helloWorld(array);'));
      functionObject.status = 'underTesting';
      mainMap.set('helloWorld', functionObject);
      event.subscribe('onTestReady', payload => {
        let testCase = payload.mainMap.get('helloWorld').testCases;
        expect(testCase.pop().expectedResult).toContain(jasmine.any(Boolean));
        done();
      });
      event.publish('onExpectedResultRequest', {mainMap});
    });

    it('should populate testCaseCode, paramsName, paramsValue properties when the selectedType is String #4', done => {
      functionObject.testCases.push(schema.getTestCaseObject(0, '', [], false, [], [], [], 'let array =`hello`; helloWorld(array);'));
      functionObject.status = 'underTesting';
      mainMap.set('helloWorld', functionObject);
      event.subscribe('onTestReady', payload => {
        let testCase = payload.mainMap.get('helloWorld').testCases;
        expect(testCase.pop().expectedResult).toEqual('hello');
        done();
      });
      event.publish('onExpectedResultRequest', {mainMap});
    });



    it('should populate expectedResult with Numbers when the selectedType is Number #5', done => {
      functionObject.testCases.push(schema.getTestCaseObject(0, '', [], false, [], [], [], 'let array =7; helloWorld(array);'));
      functionObject.status = 'underTesting';
      mainMap.set('helloWorld', functionObject);
      event.subscribe('onTestReady', payload => {
        let testCase = payload.mainMap.get('helloWorld').testCases;
        expect(testCase.pop().expectedResult).toEqual(7);
        done();
      });
      event.publish('onExpectedResultRequest', {mainMap});
    });

    it('should populate expectedResult with Bookean when the selectedType is Boolean #6', done => {
      functionObject.testCases.push(schema.getTestCaseObject(0, '', [], false, [], [], [], 'let array =true; helloWorld(array);'));
      functionObject.status = 'underTesting';
      mainMap.set('helloWorld', functionObject);
      event.subscribe('onTestReady', payload => {
        let testCase = payload.mainMap.get('helloWorld').testCases;
        expect(testCase.pop().expectedResult).toEqual(true);
        done();
      });
      event.publish('onExpectedResultRequest', {mainMap});
    });
  });
});

