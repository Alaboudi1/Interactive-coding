import { InfoSign } from '../../src/services/info-sign';
import { EventAggregator } from 'aurelia-event-aggregator';
import { annotstionWarning, annotstionPassing, annotstionFailling } from '../../test/unit/mockModule';
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


  it('should should papulate sign object properties {cssClass, errorCount, and testCasesCount} with propel values when the test cases pass', done => {
    let passingTestCase = schema.getTestCaseObject('', '', true);
    let sign = schema.getSignObject();
    let PassingfunctionObject = schema.getFunctionObject('', 0, '', '', sign, [passingTestCase, passingTestCase], true);
    mainMap.set('passing', PassingfunctionObject);
    let expectedSign = schema.getSignObject('noError', 0, 2);
    event.subscribe('onSetBreakpointRequest', map => {
      expect(map.get('passing').sign).toEqual(jasmine.objectContaining(expectedSign));
      done();
    });
    event.publish('onTestEnsureEnds', mainMap);
  });
  it('should should papulate sign object properties {cssClass, errorCount, and testCasesCount}  with propel values when the test cases fail', done => {
    let faillTestCase = schema.getTestCaseObject('', '', false);
    let sign = schema.getSignObject();
    let functionObjectFaiiling = schema.getFunctionObject('', 0, '', '', sign, [faillTestCase, faillTestCase], true);
    mainMap.set('passing', functionObjectFaiiling);
    let expectedSign = schema.getSignObject('error', 2, 2);
    event.subscribe('onSetBreakpointRequest', map => {
      expect(map.get('passing').sign).toEqual(jasmine.objectContaining(expectedSign));
      done();
    });
    event.publish('onTestEnsureEnds', mainMap);
  });
  it('should should create annotation arrays with objects {row, column, text, type} in which type has a value of warning when the function is not tracked', done => {
    let sign = schema.getSignObject();
    let functionObject = schema.getFunctionObject('', 0, '', '', sign, [], false);
    let expectedAnnotation = {
      text: 'Function waring has not been exercised yet',
      type: 'warning',
      column: 1,
      row: 0
    };
    mainMap.set('waring', functionObject);
    event.subscribe('setAnnotations', array => {
      expect(array).toContain(expectedAnnotation);
      done();
    });
    event.publish('onTestEnsureEnds', mainMap);
  });
  it('should should create annotation arrays with objects {row, column, text, type} in which type has a value of info when all test cases pass', done => {
    let passingTestCase = schema.getTestCaseObject('', '', true);
    let sign = schema.getSignObject();
    let PassingfunctionObject = schema.getFunctionObject('', 0, '', '', sign, [passingTestCase, passingTestCase], true);
    let expectedAnnotation = {
      text: 'All the 2 test cases Pass',
      type: 'info',
      column: 1,
      row: 0
    };
    mainMap.set('info', PassingfunctionObject);
    event.subscribe('setAnnotations', array => {
      expect(array).toContain(expectedAnnotation);
      done();
    });
    event.publish('onTestEnsureEnds', mainMap);
  });
  it('should should create annotation arrays with objects {row, column, text, type} in which type has a value of info when all test cases faill', done => {
    let faillTestCase = schema.getTestCaseObject('', '', false);
    let sign = schema.getSignObject();
    let functionObjectFaiiling = schema.getFunctionObject('', 0, '', '', sign, [faillTestCase, faillTestCase], true);
    let expectedAnnotation = {
      text: '2 out of 2 test cases Fail',
      type: 'info',
      column: 1,
      row: 0
    };
    mainMap.set('info', functionObjectFaiiling);
    event.subscribe('setAnnotations', array => {
      expect(array).toContain(expectedAnnotation);
      done();
    });
    event.publish('onTestEnsureEnds', mainMap);
  });
  it('should should create annotation arrays with objects {row, column, text, type} in which type has a value of info when some test cases faill', done => {
    let faillTestCase = schema.getTestCaseObject('', '', false);
    let passingTestCase = schema.getTestCaseObject('', '', true);
    let sign = schema.getSignObject();
    let functionObjectFaiiling = schema.getFunctionObject('', 0, '', '', sign, [faillTestCase, passingTestCase], true);
    let expectedAnnotation = {
      text: '1 out of 2 test cases Fail',
      type: 'info',
      column: 1,
      row: 0
    };
    mainMap.set('info', functionObjectFaiiling);
    event.subscribe('setAnnotations', array => {
      expect(array).toContain(expectedAnnotation);
      done();
    });
    event.publish('onTestEnsureEnds', mainMap);
  });
});
