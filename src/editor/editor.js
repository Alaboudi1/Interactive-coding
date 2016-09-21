
import {EventAggregator} from 'aurelia-event-aggregator'
import {inject} from 'aurelia-framework'
import {Run} from '../servicesBootstrapper/run'
@inject(EventAggregator, Run)
export class Editor {

    constructor(event) {
        this.event = event;
    }
    attached() {
        this.editor = ace.edit("editor");
        this.editor.$blockScrolling = Infinity;
        this.editor.setTheme("ace/theme/chrome");
        this.editor.getSession().setMode("ace/mode/javascript");
        this.session = this.editor.getSession();
        this.session.setValue(
            `function add (x,y){
            return x+y;
        }
        
        function remove (x,y){
            return x-y;
        }   
        
        function g (g){
            return g;
        }  
        
        function oddOreven(f){
            if(f%2 ===0){
                return "even";
            }
            else{
                return "odd";
            }
        }  `)
        this.NoError = false;
        this.publish();
        this.subscribe();


    }


    publish() {
        this.event.publish('onEditorReady', this.editor);


        let flag = true;
        this.editor.session.on('change',
            () => {
                this.onError();
                if (flag) {
                    flag = false;
                    setTimeout(_ => {
                        const code = this.session.getValue();
                        const payload = {
                            code: code,
                        }
                        if (this.NoError) {
                            this.event.publish('onEditorChanged', payload);
                        }
                        flag = true;
                    }, 1000)
                }
            });



        this.editor.on("gutterclick", e => {
            const payload = e.getDocumentPosition().row;
            this.event.publish("onDialogRequest", payload);
        });
          setTimeout(_=>{
        this.event.publish('onEditorChanged', {code:this.editor.getValue()});}, 800);
    }

    onError() {
        const event = this.event;
        this.session.on("changeAnnotation", _ => {
            let NoError = true;
            const annot = this.session.getAnnotations();
            for (let key in annot) {
                if (annot.hasOwnProperty(key)) {
                    NoError = !NoError;
                    break;
                }
            }
            if (this.NoError != NoError)
                event.publish('onError', NoError);
        });
    }

    subscribe() {
        this.event.subscribe('onError', payload => {
            this.NoError = payload;
        });

        this.event.subscribe("setBreakpointRequest", payload => {
            this.session.clearBreakpoints();
            console.log(payload);

            for (let sign of payload)
                this.session.setBreakpoint(sign.location , sign.cssClass);
        });

        this.event.subscribe("setAnnotations", payload => {
            console.log(payload);
            this.session.setAnnotations(payload);

        });
    }
}