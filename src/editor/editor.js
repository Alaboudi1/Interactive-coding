
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
        this.session.setValue(`function add (x,y){
            return x+y;
        }`)
        this.NoError = false;
        this.subscribe();
        this.publish();
    }

    publish() {

        let flag = true;
        this.editor.renderer.on('afterRender',
            (e, render) => {
                this.onError();
                //   console.error(this.NoError);
                if (flag) {
                    flag = false;
                    setTimeout(
                        () => {
                            let code = this.session.getValue();
                            let payload = {
                                code: code,
                                render: render
                            }
                            if (this.NoError) {
                                this.event.publish('OnEditorChanged', payload);
                             //   this.editor.session.clearBreakpoints();

                            }
                            flag = true;
                        }, 2000)
                }
            });
        console.info("ready");
        this.event.publish('onEditorReady', this.editor);
        this.editor.on("gutterclick", (e) => {
            const payload = e.getDocumentPosition().row + 1;
            this.event.publish("onDialogRequest", payload);
        })

    }

    onError() {
        let event = this.event;
        this.session.on("changeAnnotation", _ => {
            let NoError = true;
            const annot = this.session.getAnnotations();
            for (let key in annot) {
                if (annot.hasOwnProperty(key)) {
                    NoError = false;
                    break;
                }
            }
            if (this.NoError != NoError)
                event.publish('onError', NoError);
        });
    }

    subscribe() {

        this.event.subscribe('onTestEnsureEnds', errors => {

            if (!errors.get("add"))
                this.editor.session.setBreakpoint(0, "sucess");
            else {
                this.editor.session.setBreakpoint(0);

            }
        });

        this.event.subscribe('onError', (NoError) => {
            //    console.log(`subscribe ${NoError}`)
            this.NoError = NoError;
        })
    }

}