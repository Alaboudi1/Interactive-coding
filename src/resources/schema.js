

export class Schema {

  constructor() {}
  getMainMap() {
    return new Map();
  }
  getFunctionObject(code = '', location = '', name = '', params = [], sign = this.getSignObject, testCases = [], status = 'untracked' ) {
    return {
      code, //'code written in the editor',
      location, // 'line number in which the function starts',
      name, //'function name',
      params, //'array of paramters for the function -->getParamObject',
      sign, //'object contains all the sign properties -->getsignObject',
      testCases, //'array of test cases -->getTestCaseObject'
      status // 'untracked, tracked, underTesting'
    };
  }
  getParamObject(name = '', selectedType = '', properties = [] ) {
    return {
      name, //name of the paramter
      selectedType,  //' the type of the paramter'
      properties //in case of the selectedType is object literal
    };
  }
  getSignObject(cssClass = 'noError', errorCount = 0, testCasesCount = 0) {
    return {
      cssClass, // 'error, noError or success',
      errorCount, //'count how many test cases faill',
      testCasesCount//'count how many test cases for a function'
    };
  }
  getTestCaseObject( id = 0, status = '', expectedResult = 'infinite loop', pass = false, paramsName = [], paramsValue = [], actualResult = 'infinite loop', testCaseCode = '') {
    return {
      id,
      status,   // 'ok, wrong or irrelevant',
      expectedResult, // 'the expected result from running the test case --> String or []',
      pass, //'true if the test cases pass the test',
      paramsName, // 'the name of the  paramters for the test case',
      paramsValue, //'Array contains the value of the paramters for the test case',
      actualResult, // 'the actual result of running the test case',
      testCaseCode // 'the code that going to execute to run the test case',
    };
  }
  testCasesFactory(number) {
    const localTestCases = [];
    for (let i = 0; i < number; i++) {
      localTestCases.push(this.getTestCaseObject(i));
    }
    return localTestCases;
  }
  paramFactory(newParams) {
    return newParams.map(param => (this.getParamObject(param.name, param.selectedType)));
  }
  restingActualResult(testCases) {
    testCases.forEach(testCase => testCase.actualResult = 'infinity loop');
    return testCases;
  }
}
