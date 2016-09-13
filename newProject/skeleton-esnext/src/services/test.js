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
    }


    subscribe() {
        this.event.subscribe('onEditorReady', (editor) => {
        this.editor = editor;
    });
        this.event.subscribe('onTraverseEnds', (payload) => {
            this.infoSign = payload;
            console.log(payload)

        });
        this.event.subscribe('onDialogRequest', (payload) => {
               const line = payload;
               const info = this.infoSign.FunctionDeclaration.filter(item => 
                              item.loc.start.line === line
               );           
                     console.log(info)
                this.dialogService.openAndYieldController({ viewModel: Dialog, model: info }).then(controller => {
                    // Note you get here when the dialog is opened, and you are able to close dialog  
                    // Promise for the result is stored in controller.result property
                    controller.result.then((response) => {

                        if (!response.wasCancelled) {
                            console.log('good');
                        } else {
                            console.log('bad');
                        }
                             
                    })


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
                

             const code = `${this.editor.getSession().getValue()} ${payload[0].id.name} ${data.params};` 
             data.result= eval(code);
             testCases.push(data)
           }
            console.log(testCases);
            this.event.publish("onTestReady", testCases);

       });
    }
}