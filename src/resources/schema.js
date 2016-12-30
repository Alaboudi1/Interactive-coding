

export class schema {


  getMainMap() {
    return new Map();
  }
  getFunctionObject() {
    return {
      code: 'code written in the editor',
      location: 'line number in which the function starts',
      name: 'name of the function',
      params: 'the paramters for the function',
      sign: 'object contains all the sign properties',
      testCases: 'array of test cases'
    };
  }
  getparamsObject() {
    return {
      name: 'name of the paramter',
      selectedType: ' the type of the paramter'
    };
  }
  getsignObject() {
    return {
      cssClass: 'error, warning or success',
      errorCount: 'count how many test cases faill',
      testCasesCount: 'count how many test cases for a function'
    };
  }
  getTestCases() {
    return {
      status: 'ok, wrong or irrelevant',
      expectedResult: 'the expected result from running the test case --> String or []',
      pass: 'true if the test cases pass the test',
      paramsAsString: 'the paramters for the test case',
      paramsAsValue: 'Array contains the paramters for the test case',
      result: 'the actual result of running the test case',
      testCasesCode: 'the code that going to execute to run the test case'
    };
  }
}
