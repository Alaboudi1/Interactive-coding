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
        this.testCasesCollection= new Map();
        console.log(this.testCasesCollection);
    }


    subscribe() {
        this.event.subscribe('onEditorReady', (editor) => {
        this.editor = editor;
    });
        this.event.subscribe('onTraverseEnds', (payload) => {
            this.infoSign = payload;
             if(this.testCasesCollection.size){
                 this.ensureTest();
             }
        });

        this.event.subscribe('onDialogRequest', (payload) => {
               const line = payload;
               let code={}
               code.metaData = this.infoSign.FunctionDeclaration.filter(item => 
                              item.loc.start.line === line
               );
                  code.testCasesExists =this.testCasesCollection.get(code.metaData[0].id.name);
                     
                     
                this.dialogService.openAndYieldController({ viewModel: Dialog, model: code }).then(controller => {
                    // Note you get here when the dialog is opened, and you are able to close dialog  
                    // Promise for the result is stored in controller.result property
                    controller.result.then((response) => {

                        if (!response.wasCancelled) {
                            console.log('good');
                        } else {
                            console.log('bad');
                        }
                             
                    });


                });
            
        });

        this.event.subscribe('onTestRequest', payload=>{
                const testCases = [];
                let data;
                let value;
                let param; 
                for(let i =0; i<10 ; i++){
                     data={};
                     value =[]
                     data.params = "(";
                    for(let j=0; j < payload[0].params.length; j++){
                      param = faker.random.number({
                        min:-10,
                        max: 10
                    })
                    value.push(param);
                    data.value=value; 
                        data.params += j+1 == payload[0].params.length ? `${param}`: `${param},`;
                    }
                    data.params+=")";
                

             data.code = `${this.editor.getSession().getValue()} ${payload[0].id.name} ${data.params};` 
             data.result= this.execute(data.code);
             testCases.push(data)
           }
            testCases.id= payload[0].id.name;
            this.event.publish("onTestReady", testCases);
            
       });
         this.event.subscribe('onTestResultSaveRequest', (payload) => {
        this.testCasesCollection.set(payload.id, payload); 
//        console.log(this.testCasesCollection);
    });
    }

    execute(code){
        return eval(code);
    }

    ensureTest(){
        let newCode;
        let errors= new Map();
        for(const [key , testCases] of this.testCasesCollection){
             newCode = `${this.editor.getSession().getValue()} ${key}` 
            console.log();
            errors.set(key,this.testevery(testCases, newCode));  
        }
                
        this.event.publish('onTestEnsureEnds', errors);
    }

    testevery(testCases,newCode){
        let error= true;
        let errorCount =0;
         for (let item of testCases){
                error= item.result === this.execute(`${newCode} ${item.params}`);
                if(!error)
                   errorCount;
            }
            return errorCount;
    }
}