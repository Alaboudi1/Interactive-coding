

export class Schema {


  getMainMap() {
    return new Map();
  }
  getFunctionObject() {
    return {
      code: 'code written in the editor',
      location: 'line number in which the function starts',
      name: 'function name',
      params: [], //'array of paramters for the function -->getParamObject',
      sign: {}, //'object contains all the sign properties -->getsignObject',
      testCases: [], //'array of test cases -->getTestCaseObject'
      track: false // 'if this function needs to be tracked with tests'
    };
  }
  getParamObject(name = '', selectedType = '' ) {
    return {
      name, //name of the paramter
      selectedType  //' the type of the paramter'
    };
  }
  getSignObject() {
    return {
      cssClass: 'noError', // 'error, noError or success',
      errorCount: 0, //'count how many test cases faill',
      testCasesCount: 0 //'count how many test cases for a function'
    };
  }
  getTestCaseObject() {
    return {
      status: 'ok, wrong or irrelevant',
      expectedResult: [], // 'the expected result from running the test case --> String or []',
      pass: false, //'true if the test cases pass the test',
      paramsName: [], // 'the name of the  paramters for the test case',
      paramsValue: [], //'Array contains the value of the paramters for the test case',
      actualResult: 'the actual result of running the test case',
      testCaseCode: '' // 'the code that going to execute to run the test case',
    };
  }
}
