import { InfoSign } from '../../src/services/info-sign';
import { EventAggregator } from 'aurelia-event-aggregator';
import { annotstionWarning, annotstionPassing, annotstionFailling, annotstionSomeFailling } from '../../test/unit/mockModule.spec';
import { Schema } from '../../src/resources/schema';


describe('the behavior of info-sign module', () => {
  let event;
  let infoSign;
  let schema;
  let mainMap;

  beforeEach(() => {
    event = new EventAggregator();
    infoSign = new InfoSign(event);
    schema = new Schema();
    mainMap = schema.getMainMap();
    infoSign.subscribe();
  });


  it('should should papulate sign object properties {cssClass, errorCount, and testCasesCount} with propel values when the test cases pass #1', done => {
    let passingTestCase = schema.getTestCaseObject(0, '', '', true);
    let sign = schema.getSignObject();
    let PassingfunctionObject = schema.getFunctionObject('', 0, '', '', sign, [passingTestCase, passingTestCase], 'tracked');
    mainMap.set('passing', PassingfunctionObject);

    let expectedSign = schema.getSignObject('noError', 0, 2);
    event.subscribe('onSetBreakpointRequest', map => {
      expect(map.get('passing').sign).toEqual(jasmine.objectContaining(expectedSign));
      done();
    });
    event.publish('onTestEnsureEnds', mainMap);
  });
  it('should should papulate sign object properties {cssClass, errorCount, and testCasesCount}  with propel values when the test cases fail #2', done => {
    let faillTestCase = schema.getTestCaseObject(0, '', '', false);
    let sign = schema.getSignObject();
    let functionObjectFaiiling = schema.getFunctionObject('', 0, '', '', sign, [faillTestCase, faillTestCase], 'tracked');
    mainMap.set('passing', functionObjectFaiiling);

    let expectedSign = schema.getSignObject('error', 2, 2);
    event.subscribe('onSetBreakpointRequest', map => {
      expect(map.get('passing').sign).toEqual(jasmine.objectContaining(expectedSign));
      done();
    });
    event.publish('onTestEnsureEnds', mainMap);
  });
  it('should should create annotation arrays with objects {row, column, text, type} in which type has a value of warning when the function is not tracked #3', done => {
    let sign = schema.getSignObject();
    let functionObject = schema.getFunctionObject('', 0, '', '', sign, [], 'untracked');

    mainMap.set('helloWorld', functionObject);
    event.subscribe('setAnnotations', array => {
      expect(array).toContain(annotstionWarning);
      done();
    });
    event.publish('onTestEnsureEnds', mainMap);
  });
  it('should should create annotation arrays with objects {row, column, text, type} in which type has a value of info when all test cases pass #4', done => {
    let passingTestCase = schema.getTestCaseObject(0, '', '', true);
    let sign = schema.getSignObject();
    let PassingfunctionObject = schema.getFunctionObject('', 0, '', '', sign, [passingTestCase, passingTestCase], 'tracked');

    mainMap.set('info', PassingfunctionObject);
    event.subscribe('setAnnotations', array => {
      expect(array).toContain(annotstionPassing);
      done();
    });
    event.publish('onTestEnsureEnds', mainMap);
  });
  it('should should create annotation arrays with objects {row, column, text, type} in which type has a value of info when all test cases faill #5', done => {
    let faillTestCase = schema.getTestCaseObject(0, '', '', false);
    let sign = schema.getSignObject();
    let functionObjectFaiiling = schema.getFunctionObject('', 0, '', '', sign, [faillTestCase, faillTestCase], 'tracked');

    mainMap.set('info', functionObjectFaiiling);
    event.subscribe('setAnnotations', array => {
      expect(array).toContain(annotstionFailling);
      done();
    });
    event.publish('onTestEnsureEnds', mainMap);
  });
  it('should should create annotation arrays with objects {row, column, text, type} in which type has a value of info when some test cases faill #6', done => {
    let faillTestCase = schema.getTestCaseObject(0, '', '', false);
    let passingTestCase = schema.getTestCaseObject(0, '', '', true);
    let sign = schema.getSignObject();
    let functionObjectFaiiling = schema.getFunctionObject('', 0, '', '', sign, [faillTestCase, passingTestCase], 'tracked');

    mainMap.set('info', functionObjectFaiiling);
    event.subscribe('setAnnotations', array => {
      expect(array).toContain(annotstionSomeFailling);
      done();
    });
    event.publish('onTestEnsureEnds', mainMap);
  });
}); 
