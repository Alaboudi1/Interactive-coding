import { Evaluator } from '../../src/services/evaluator';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Schema } from '../../src/resources/schema';
import { code, infiniteCode, undefinedCode, ErrorCode} from '../../test/unit/mockModule.spec';


describe('the behavior of evaluator module ', () => {
  describe('regarding evaluating code with finite result (6 Tests)', () => {
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

    it('should populate expectedResult with array of numbers when the selectedType is Array of Numbers 2/6', done => {
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

    it('should populate testCaseCode, paramsName, paramsValue properties when the selectedType is Array of Boolean 3/6', done => {
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

    it('should populate testCaseCode, paramsName, paramsValue properties when the selectedType is String 4/6', done => {
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


    it('should populate expectedResult with Numbers when the selectedType is Number 5/6', done => {
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

    it('should populate expectedResult with Bookean when the selectedType is Boolean 6/6', done => {
      functionObject.testCases.push(schema.getTestCaseObject(0, '', [], false, [], [], [], 'let array = true; helloWorld(array);'));
      functionObject.status = 'underTesting';
      mainMap.set('helloWorld', functionObject);
      event.subscribe('onTestReady', payload => {
        let testCase = payload.mainMap.get('helloWorld').testCases;
        expect(testCase.pop().expectedResult).toEqual(true);
        done();
      });
      event.publish('onExpectedResultRequest', {mainMap});
    });
    it('should populate actualResult with primitive when the selectedType is primitive 7/8', done => {
      functionObject.testCases.push(schema.getTestCaseObject(0, '', [], false, [], [], [], 'let array =7; helloWorld(array);'));
      functionObject.status = 'tracked';
      mainMap.set('helloWorld', functionObject);
      event.subscribe('onActualResultDone', payload => {
        let testCase = payload.mainMap.get('helloWorld').testCases;
        expect(testCase.pop().actualResult).toEqual(7);
        done();
      });
      event.publish('onTraverseEnds', {mainMap});
    });
    it('should populate testCaseCode, paramsName, paramsValue properties when the selectedType is Array of Boolean 8/8', done => {
      functionObject.testCases.push(schema.getTestCaseObject(0, '', [], false, [], [], [], 'let array =[true, false]; helloWorld(array);'));
      functionObject.status = 'tracked';
      mainMap.set('helloWorld', functionObject);
      event.subscribe('onActualResultDone', payload => {
        let testCase = payload.mainMap.get('helloWorld').testCases;
        expect(testCase.pop().actualResult).toContain(jasmine.any(Boolean));
        done();
      });
      event.publish('onTraverseEnds', {mainMap});
    });
    it('should not populate expectedResult when status is untracked 6/6', done => {
      functionObject.testCases.push(schema.getTestCaseObject(0, '', [], false, [], [], [], 'let array = true; helloWorld(array);'));
      functionObject.status = 'untracked';
      mainMap.set('helloWorld', functionObject);
      event.subscribe('onCreateIndicatorsRequest', payload => {
        let testCase = payload.mainMap.get('helloWorld').testCases.pop();
        expect(testCase.expectedResult).toEqual([]);
        expect(testCase.actualResult).toEqual([]);
        done();
      });
      event.publish('onExpectedResultRequest', {mainMap});
    });
    it('should not populate expectedResult when status is tracked and event is onActualResultRequest 6/6', done => {
      functionObject.testCases.push(schema.getTestCaseObject(0, '', [], false, [], [], [], 'let array = true; helloWorld(array);'));
      functionObject.status = 'tracked';
      mainMap.set('helloWorld', functionObject);
      event.subscribe('onCreateIndicatorsRequest', payload => {
        let testCase = payload.mainMap.get('helloWorld').testCases.pop();
        expect(testCase.expectedResult).toEqual([]);
        expect(testCase.actualResult).toEqual([]);
        done();
      });
      event.publish('onExpectedResultRequest', {mainMap});
    });
    it('should not populate expectedResult when status is underTesting and event is onTraverseEnds 6/6', done => {
      functionObject.testCases.push(schema.getTestCaseObject(0, '', [], false, [], [], [], 'let array = true; helloWorld(array);'));
      functionObject.status = 'underTesting';
      mainMap.set('helloWorld', functionObject);
      event.subscribe('onCreateIndicatorsRequest', payload => {
        let testCase = payload.mainMap.get('helloWorld').testCases.pop();
        expect(testCase.expectedResult).toEqual([]);
        expect(testCase.actualResult).toEqual([]);
        done();
      });
      event.publish('onTraverseEnds', {mainMap});
    });
  });
  describe('regarding evaluating problematic code ', () => {
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
      functionObject.name = 'helloWorld';
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      evaluator.subscribe();
    });
    it('should report the infinite loop for the actualResult 8/8', done => {
      let testCase = schema.getTestCaseObject();
      testCase.testCaseCode = 'loop(6)';
      functionObject.testCases.push(testCase);
      functionObject.status = 'tracked';
      functionObject.code = infiniteCode;
      mainMap.set('loop', functionObject);
      event.subscribe('onActualResultDone', payload => {
        testCase = payload.mainMap.get('loop').testCases;
        expect(testCase.pop()).toEqual(jasmine.objectContaining({actualResult: 'infinite loop'}));
        done();
      });
      event.publish('onTraverseEnds', {mainMap});
    });
    it('should report the infinite loop for the expectedResult 8/8', done => {
      let testCase = schema.getTestCaseObject();
      testCase.testCaseCode = 'loop(6);';
      functionObject.testCases.push(testCase);
      functionObject.status = 'underTesting';
      functionObject.code = infiniteCode;
      mainMap.set('loop', functionObject);
      event.subscribe('onTestReady', payload => {
        testCase = payload.mainMap.get('loop').testCases;
        expect(testCase.pop()).toEqual(jasmine.objectContaining({expectedResult: 'infinite loop'}));
        done();
      });
      event.publish('onExpectedResultRequest', {mainMap});
    });
    it('should report the any error in the code for the actualResult 8/8', done => {
      let testCase = schema.getTestCaseObject();
      testCase.testCaseCode = 'helloWorld(`message`);';
      functionObject.testCases.push(testCase);
      functionObject.status = 'tracked';
      functionObject.code = ErrorCode;
      mainMap.set('helloWorld', functionObject);
      event.subscribe('onActualResultDone', payload => {
        testCase = payload.mainMap.get('helloWorld').testCases;
        expect(testCase.pop()).toEqual(jasmine.objectContaining({actualResult: NaN}));
        done();
      });
      event.publish('onTraverseEnds', {mainMap});
    });
    it('should report the any error in the code for the expectedResult 8/8', done => {
      let testCase = schema.getTestCaseObject();
      testCase.testCaseCode = 'helloWorld(`message`);';
      functionObject.testCases.push(testCase);
      functionObject.status = 'underTesting';
      functionObject.code = ErrorCode;
      mainMap.set('helloWorld', functionObject);
      event.subscribe('onTestReady', payload => {
        testCase = payload.mainMap.get('helloWorld').testCases;
        expect(testCase.pop()).toEqual(jasmine.objectContaining({expectedResult: NaN}));
        done();
      });
      event.publish('onExpectedResultRequest', {mainMap});
    });
    it('should report undefined value for the actualResult 8/8', done => {
      let testCase = schema.getTestCaseObject();
      testCase.testCaseCode = 'helloWorld(`message`)';
      functionObject.testCases.push(testCase);
      functionObject.status = 'tracked';
      functionObject.code = undefinedCode;
      mainMap.set('helloWorld', functionObject);
      event.subscribe('onActualResultDone', payload => {
        testCase = payload.mainMap.get('helloWorld').testCases;
        expect(testCase.pop().actualResult).toBe('undefined');
        done();
      });
      event.publish('onTraverseEnds', {mainMap});
    });
    it('should report the infinite loop for the expectedResult 8/8', done => {
      let testCase = schema.getTestCaseObject();
      testCase.testCaseCode = 'helloWorld(`message`)';
      functionObject.testCases.push(testCase);
      functionObject.status = 'underTesting';
      functionObject.code = undefinedCode;
      mainMap.set('helloWorld', functionObject);
      event.subscribe('onTestReady', payload => {
        testCase = payload.mainMap.get('helloWorld').testCases;
        expect(testCase.pop().expectedResult).toBe('undefined');
        done();
      });
      event.publish('onExpectedResultRequest', {mainMap});
    });
  });
});

