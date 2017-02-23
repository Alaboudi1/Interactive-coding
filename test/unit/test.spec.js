import { Test } from '../../src/services/test';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Schema } from '../../src/resources/schema';
import { code } from '../../test/unit/mockModule.spec';


describe('the behavior of test module (12 Test) ', () => {
  describe('regarding creating test cases (9 Test)', () => {
    let event;
    let test;
    let schema;
    let functionObject;
    let mainMap;

    beforeEach(() => {
      event = new EventAggregator();
      test = new Test(event);
      schema = new Schema();
      functionObject = schema.getFunctionObject(
        code,
        '',
        'helloWorld',
        [],
        '',
        [],
        'tracked',
        3
         );
      mainMap = schema.getMainMap();
      mainMap.set('helloWorld', functionObject);
      test.subscribe(schema);
    });
    it(`should populate testCaseCode, paramsName, paramsValue properties when the selectedType is
      Array of Object Literals 1/7`, done => {
      functionObject.params.push(schema.getParamObject('message', 'Array of Object Literals', [{name: 'age', selectedType: 'Number'}]));
      event.subscribe('onExpectedResultRequest', payload => {
        expect(payload.mainMap.get('helloWorld').testCases.length).toBe(3);
        let testCase = payload.mainMap.get('helloWorld').testCases.pop();
        expect(testCase.paramsName).toContain(jasmine.any(String));
        expect(testCase.testCaseCode).toContain('helloWorld');
        expect(testCase.id).toBe(2);
        expect(testCase.paramsValue[0]).toContain(jasmine.any(Object));
        expect(testCase.paramsValue[0].pop().age).toEqual(jasmine.any(Number));
        done();
      });
      event.publish('onTestCreateRequest', {mainMap, functionName: 'helloWorld'});
    });
    it(`should populate testCaseCode, paramsName, paramsValue properties when the selectedType is
      Array of String 1/9`, done => {
      functionObject.params.push(schema.getParamObject('message', 'Array of Strings'));
      event.subscribe('onExpectedResultRequest', payload => {
        expect(payload.mainMap.get('helloWorld').testCases.length).toBe(3);
        let testCase = payload.mainMap.get('helloWorld').testCases.pop();
        expect(testCase.paramsName).toContain(jasmine.any(String));
        expect(testCase.testCaseCode).toContain('helloWorld');
        expect(testCase.id).toBe(2);
        expect(testCase.paramsValue.pop()).toContain(jasmine.any(String));
        done();
      });
      event.publish('onTestCreateRequest', {mainMap, functionName: 'helloWorld'});
    });

    it(`should populate testCaseCode, paramsName, paramsValue properties when the selectedType is
      Array of Numbers 2/9`, done => {
      functionObject.params.push(schema.getParamObject('message', 'Array of Numbers'));
      event.subscribe('onExpectedResultRequest', payload => {
        expect(payload.mainMap.get('helloWorld').testCases.length).toBe(3);
        let testCase = payload.mainMap.get('helloWorld').testCases.pop();
        expect(testCase.paramsName).toContain(jasmine.any(String));
        expect(testCase.testCaseCode).toContain('helloWorld');
        expect(testCase.id).toBe(2);
        expect(testCase.paramsValue.pop()).toContain(jasmine.any(Number));
        done();
      });
      event.publish('onTestCreateRequest', {mainMap, functionName: 'helloWorld'});
    });

    it(`should populate testCaseCode, paramsName, paramsValue properties when the selectedType is
      Array of Boolean 3/9`, done => {
      functionObject.params.push(schema.getParamObject('message', 'Array of Booleans'));
      event.subscribe('onExpectedResultRequest', payload => {
        expect(payload.mainMap.get('helloWorld').testCases.length).toBe(3);
        let testCase = payload.mainMap.get('helloWorld').testCases.pop();
        expect(testCase.paramsName).toContain(jasmine.any(String));
        expect(testCase.testCaseCode).toContain('helloWorld');
        expect(testCase.id).toBe(2);
        expect(testCase.paramsValue.pop()).toContain(jasmine.any(Boolean));
        done();
      });
      event.publish('onTestCreateRequest', {mainMap, functionName: 'helloWorld'});
    });

    it(`should populate testCaseCode, paramsName, paramsValue properties when the selectedType is
      String 4/9`, done => {
      functionObject.params.push(schema.getParamObject('message', 'String'));
      event.subscribe('onExpectedResultRequest', payload => {
        expect(payload.mainMap.get('helloWorld').testCases.length).toBe(3);
        let testCase = payload.mainMap.get('helloWorld').testCases.pop();
        expect(testCase.paramsName).toContain(jasmine.any(String));
        expect(testCase.testCaseCode).toContain('helloWorld');
        expect(testCase.id).toBe(2);
        expect(testCase.paramsValue).toContain(jasmine.any(String));
        done();
      });
      event.publish('onTestCreateRequest', {mainMap, functionName: 'helloWorld'});
    });

    it(`should populate testCaseCode, paramsName, paramsValue properties when the selectedType is
      Number 5/9`, done => {
      functionObject.params.push(schema.getParamObject('message', 'Number'));
      event.subscribe('onExpectedResultRequest', payload => {
        expect(payload.mainMap.get('helloWorld').testCases.length).toBe(3);
        let testCase = payload.mainMap.get('helloWorld').testCases.pop();
        expect(testCase.paramsName).toContain(jasmine.any(String));
        expect(testCase.testCaseCode).toContain('helloWorld');
        expect(testCase.id).toBe(2);
        expect(testCase.paramsValue).toContain(jasmine.any(Number));
        done();
      });
      event.publish('onTestCreateRequest', {mainMap, functionName: 'helloWorld'});
    });
    it(`should populate testCaseCode, paramsName, paramsValue properties when the selectedType is
      Boolean 6/9`, done => {
      functionObject.params.push(schema.getParamObject('message', 'Boolean'));
      event.subscribe('onExpectedResultRequest', payload => {
        expect(payload.mainMap.get('helloWorld').testCases.length).toBe(3);
        let testCase = payload.mainMap.get('helloWorld').testCases.pop();
        expect(testCase.paramsName).toContain(jasmine.any(String));
        expect(testCase.testCaseCode).toContain('helloWorld');
        expect(testCase.id).toBe(2);
        expect(testCase.paramsValue).toContain(jasmine.any(Boolean));
        done();
      });
      event.publish('onTestCreateRequest', {mainMap, functionName: 'helloWorld'});
    });
    it('should populate the status with underTesting 7/9', done => {
      functionObject.params.push(schema.getParamObject('message', 'Boolean'));
      event.subscribe('onExpectedResultRequest', payload => {
        let localFunctionObject = payload.mainMap.get('helloWorld');
        expect(localFunctionObject.status).toBe('underTesting');
        done();
      });
      event.publish('onTestCreateRequest', {mainMap, functionName: 'helloWorld'});
    });
    it('should populate testCaseCode, paramsName, paramsValue properties when tthe testcase is edited 8/9', done => {
      functionObject.params.push(schema.getParamObject('message', 'Boolean'));
      let secondValue;
      event.subscribe('onExpectedResultRequest', payload => {
        let testCase = payload.mainMap.get('helloWorld').testCases[0];
        secondValue = !testCase.paramsValue[0];
        testCase.paramsValue[0] = secondValue;
        testCase.status = 'edited';
        event.publish('onTestEditedRequest', {mainMap, functionName: 'helloWorld'});
      });
      event.subscribe('onTraverseEnds', payload =>{
        let testCase = payload.mainMap.get('helloWorld').testCases[0];
        expect(testCase.testCaseCode).toContain(`${secondValue}`);
        done();
      });
      event.publish('onTestCreateRequest', {mainMap, functionName: 'helloWorld'});
    });
  });
  /////////////////////////////////
  describe('regarding executing test cases ', () => {
    let event;
    let test;
    let mainMap;
    let schema;
    let functionObject;

    beforeEach(() => {
      event = new EventAggregator();
      test = new Test(event);
      schema = new Schema();
      mainMap = schema.getMainMap();
      functionObject = schema.getFunctionObject();
      functionObject.code = code;
      functionObject.testCases.push(schema.getTestCaseObject());
      functionObject.status = 'tracked';
      mainMap.set('helloWorld', functionObject);
      test.subscribe();
    });
    it('should execute the test and passes it if the expectedResult === actualResult and the type is primitive #1', done => {
      let localObj = mainMap.get('helloWorld');
      localObj.testCases[0] = { testCaseCode: 'helloWorld("this is a test");', expectedResult: 'this is a test', actualResult: 'this is a test' };
      event.subscribe('onCreateIndicatorsRequest', payload => {
        expect(payload.mainMap.get('helloWorld').testCases[0].pass).toBe(true);
        done();
      });
      event.publish('onActualResultDone', {mainMap});
    });

    it('should execute the test and passes it if the expectedResult === actualResult and the type is array #2', done => {
      let localObj = mainMap.get('helloWorld');
      localObj.testCases[0] = { testCaseCode: 'helloWorld([1,2,3]);', expectedResult: [1, 2, 3], actualResult: [1, 2, 3] };
      event.subscribe('onCreateIndicatorsRequest', payload => {
        expect(payload.mainMap.get('helloWorld').testCases[0].pass).toBe(true);
        done();
      });
      event.publish('onActualResultDone', {mainMap});
    });

    it('should execute the test and faills it if the expectedResult != actualResult when type is primitive #3', done => {
      let localObj = mainMap.get('helloWorld');
      localObj.testCases[0] = { testCaseCode: 'helloWorld("this is not a test");', expectedResult: 'this is a test', actualResult: 'this is not a test' };
      event.subscribe('onCreateIndicatorsRequest', payload => {
        expect(payload.mainMap.get('helloWorld').testCases[0].pass).toBe(false);
        done();
      });
      event.publish('onActualResultDone', {mainMap});
    }, );
    it('should execute the test and faills it if the expectedResult != actualResult when type is array #4', done => {
      let localObj = mainMap.get('helloWorld');
      localObj.testCases[0] = { testCaseCode: 'helloWorld([1,3,2]);', expectedResult: [1, 2, 3] };
      event.subscribe('onCreateIndicatorsRequest', payload => {
        expect(payload.mainMap.get('helloWorld').testCases[0].pass).toBe(false);
        done();
      });
      event.publish('onActualResultDone', {mainMap});
    });
  });
});
