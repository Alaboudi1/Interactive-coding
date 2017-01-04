// import {ChildRouter} from '../../src/child-router';

// class RouterStub {
//   configure(handler) {
//     handler(this);
//   }

//   map(routes) {
//     this.routes = routes;
//   }
// }

// describe('the Child Router module', () => {
//   var sut;
//   var mockedRouter;

//   beforeEach(() => {
//     mockedRouter = new RouterStub();
//     sut = new ChildRouter();
//     sut.configureRouter(mockedRouter, mockedRouter);
//   });

//   it('contains a router property', () => {
//     expect(sut.router).toBeDefined();
//   });

//   it('configures the heading', () => {
//     expect(sut.heading).toEqual('Child Router');
//   });

//   it('should have a welcome route', () => {
//     expect(sut.router.routes).toContain({ route: ['', 'welcome'], name: 'welcome',  moduleId: 'welcome', nav: true, title: 'Welcome' });
//   });

//   it('should have a users route', () => {
//     expect(sut.router.routes).toContain({ route: 'users', name: 'users', moduleId: 'users', nav: true, title: 'Github Users' });
//   });

//   it('should have a child router route', () => {
//     expect(sut.router.routes).toContain({ route: 'child-router', name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' });
//   });
// });

import { Test } from '../../src/services/test';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Schema } from '../../src/resources/schema';
import { code } from '../../test/unit/mockModule';

describe('the behavior of test module regarding executing test cases ', () => {
  // describe('regarding executing test cases ', () => {
  //   let event;
  //   let test;
  //   let mainMap;
  //   let schema;
  //   let functionObject;

  //   beforeEach(() => {
  //     event = new EventAggregator();
  //     test = new Test(event);
  //     schema = new Schema();
  //     mainMap = schema.getMainMap();
  //     functionObject = schema.getFunctionObject();
  //     functionObject.code = code;
  //     functionObject.testCases.push(schema.getTestCaseObject());
  //     functionObject.track = true;
  //     mainMap.set('helloWorld', functionObject);
  //     test.subscribe();
  //   });

  //   it('should execute the test and passes it if the expectedResult === actualResult', done => {
  //     let localObj = mainMap.get('helloWorld');
  //     localObj.testCases[0].testCaseCode = 'helloWorld("this is a test");';
  //     localObj.testCases[0].expectedResult = 'this is a test';
  //     event.subscribe('onTestEnsureEnds', map => {
  //       expect(map.get('helloWorld').testCases[0].pass).toBe(true);
  //       done();
  //     });
  //     event.publish('onTraverseEnds', mainMap);
  //   }, 1000);

  //   it('should execute the test and faills it if the expectedResult != actualResult', done => {
  //     let localObj = mainMap.get('helloWorld');
  //     localObj.testCases[0].testCaseCode = 'helloWorld("this is not a test");';
  //     localObj.testCases[0].expectedResult = 'this is a test';
  //     event.subscribe('onTestEnsureEnds', map => {
  //       expect(map.get('helloWorld').testCases[0].pass).toBe(false);
  //       done();
  //     });
  //     event.publish('onTraverseEnds', mainMap);
  //   });
  // }, 1000);
  describe('regarding creating test cases', () => {
    let event;
    let test;
    let schema;
    let functionObject;

    beforeEach(() => {
      event = new EventAggregator();
      test = new Test(event);
      schema = new Schema();
      functionObject = schema.getFunctionObject();
      functionObject.code = code;
      functionObject.name = 'helloWorld';
      functionObject.testCases.push(schema.getTestCaseObject());
      functionObject.params.push(schema.getParamObject());
      test.subscribe();
    });

    it(`should populate testCaseCode, paramsName, expectedResult, paramsValue properties when the selectedType is 
      Array of String`, done => {
      functionObject.params[0].selectedType = 'Array of Strings';
      functionObject.params[0].name = 'message';
      event.subscribe('onTestReady', localObj => {
        expect(localObj.testCases[0].paramsName.length).toBe(1);
        expect(localObj.testCases[0].testCaseCode).toContain(localObj.name);
        expect(localObj.testCases[0].expectedResult).toEqual(localObj.testCases[0].paramsValue[0].map(x => x.slice(1, 1)));
        done();
      });
      event.publish('onTestCreateRequest', functionObject);
    }, 1000);

    it(`should populate testCaseCode, paramsName, expectedResult, paramsValue properties when the selectedType is 
      Array of Numbers`, done => {
      functionObject.params[0].selectedType = 'Array of Numbers';
      functionObject.params[0].name = 'message';
      event.subscribe('onTestReady', localObj => {
        expect(localObj.testCases[0].paramsName.length).toBe(1);
        expect(localObj.testCases[0].testCaseCode).toContain(localObj.name);
        expect(localObj.testCases[0].expectedResult).toEqual(localObj.testCases[0].paramsValue[0]);
        done();
      });
      event.publish('onTestCreateRequest', functionObject);
    }, 1000);

    it(`should populate testCaseCode, paramsName, expectedResult, paramsValue properties when the selectedType is 
      Array of Boolean`, done => {
      functionObject.params[0].selectedType = 'Array of Boolean';
      functionObject.params[0].name = 'message';
      event.subscribe('onTestReady', localObj => {
        expect(localObj.testCases[0].paramsName.length).toBe(1);
        expect(localObj.testCases[0].testCaseCode).toContain(localObj.name);
        expect(localObj.testCases[0].expectedResult).toEqual(localObj.testCases[0].paramsValue[0]);
        done();
      });
      event.publish('onTestCreateRequest', functionObject);
    }, 10000);

    it(`should populate testCaseCode, paramsName, expectedResult, paramsValue properties when the selectedType is 
      String`, done => {
      functionObject.params[0].selectedType = 'String';
      functionObject.params[0].name = 'message';
      event.subscribe('onTestReady', localObj => {
        expect(localObj.testCases[0].paramsName.length).toBe(1);
        expect(localObj.testCases[0].testCaseCode).toContain(localObj.name);
        expect(localObj.testCases[0].expectedResult).toEqual(localObj.testCases[0].paramsValue[0].slice(1, -1));
        done();
      });
      event.publish('onTestCreateRequest', functionObject);
    }, 10000);


    it(`should populate testCaseCode, paramsName, expectedResult, paramsValue properties when the selectedType is 
      Number`, done => {
      functionObject.params[0].selectedType = 'Number';
      functionObject.params[0].name = 'message';
      event.subscribe('onTestReady', localObj => {
        expect(localObj.testCases[0].paramsName.length).toBe(1);
        expect(localObj.testCases[0].testCaseCode).toContain(localObj.name);
        expect(localObj.testCases[0].expectedResult).toEqual(localObj.testCases[0].paramsValue[0]);
        done();
      });
      event.publish('onTestCreateRequest', functionObject);
    }, 10000);

    it(`should populate testCaseCode, paramsName, expectedResult, paramsValue properties when the selectedType is 
      Boolean`, done => {
      functionObject.params[0].selectedType = 'Boolean';
      functionObject.params[0].name = 'message';
      event.subscribe('onTestReady', localObj => {
        expect(localObj.testCases[0].paramsName.length).toBe(1);
        expect(localObj.testCases[0].testCaseCode).toContain(localObj.name);
        expect(localObj.testCases[0].expectedResult).toEqual(localObj.testCases[0].paramsValue[0]);
        done();
      });
      event.publish('onTestCreateRequest', functionObject);
    }, 10000);
  });
});
