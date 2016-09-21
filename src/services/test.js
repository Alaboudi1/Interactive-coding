import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DialogService} from 'aurelia-dialog';
import {Dialog} from '../dialog/dialog'
import faker from 'faker/locale/en';
@inject(EventAggregator, DialogService)
export class Test {

    constructor(event, dialogService) {
        this.event = event;
        this.dialogService = dialogService;
        this.testCasesCollection = new Map();
    }


    subscribe() {

        this.event.subscribe('onTraverseEnds', (payload) => {
            this.functionsInfoMap= payload.functionsInfoMap;
            this.code = payload.code;
            this.ensureTest();

        });

        this.event.subscribe('onDialogRequest', (payload) => {
            const line = payload;

            let functionInfo = this.functionsInfoMap.get(line);

            this.dialogService.openAndYieldController({ viewModel: Dialog, model: functionInfo }).then(controller => {
                // Note you get here when the dialog is opened, and you are able to close dialog  
                // Promise for the result is stored in controller.result property
                controller.result.then((response) => {

                    if (!response.wasCancelled) {
                        this.testCasesSave(response.output);

                    } else {
                        console.log('bad');
                    }

                });


            });

     });

        this.event.subscribe('onTestRequest', functionInfo => {
            let data;
            let paramsAsValue;
            let param;
            let testCases=[];
            for (let i = 0; i < 10; i++) {
                data = {};
                paramsAsValue = []
                data.paramsAsString = "(";
                for (let j = 0; j < functionInfo.params.length; j++) {
                    param = faker.random.number({
                        min: -10,
                        max: 10
                    })
                    paramsAsValue.push(param);
                    data.paramsAsValue = paramsAsValue;
                    data.paramsAsString += j + 1 == functionInfo.params.length ? `${param}` : `${param},`;
                }
                data.paramsAsString += ")";
                data.code = `${this.code} ${functionInfo.name} ${data.paramsAsString};`
                data.result = this.execute(data.code);
                testCases.push(data);
            }
            testCases.location = functionInfo.location;
           this.event.publish("onTestReady", testCases);
        });
   
    }

    execute(code) {
        return eval(code);
    }

    testCasesSave(testCases){
        let functionInfo= this.functionsInfoMap.get(testCases.location);
            functionInfo.testCases = testCases;
            console.log(this.functionsInfoMap);
    }

    ensureTest() {
        let newCode;
        let functionData = [];
        let Data = {};
        let payload = {};
        for (const [FunctionName, testCases] of this.testCasesCollection) {

            newCode = `${this.code} ${FunctionName}`

            Data.metaData = this.functionInfo.find(item => FunctionName === item.id); //refactor?

            Data.testCases = this.testevery(testCases, newCode);

            functionData.set(FunctionName, Data);
            Data = {};
        }
        payload
        this.event.publish('onTestEnsureEnds', functionData);
    }

    testevery(testCases, newCode) {
        let results = [];

        for (let item of testCases) {
            let test = {};
            test.params = item.value;
            test.output = this.execute(`${newCode} ${item.params}`);
            test.expected = item.result;
            test.NoError = test.expected === test.output;
            results.push(test);

        }
        return results;
    }
}