
import {EventAggregator} from 'aurelia-event-aggregator'
import {inject} from 'aurelia-framework'
import {Run} from '../servicesBootstrapper/run'
@inject(EventAggregator,Run)
export class Editor {

    constructor(event) {
        this.event = event;
        this.subscribe();
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
        this.publish();
    }

    publish() {

        let flag = true;
        this.editor.renderer.on('afterRender',
          (e,render) => {
                this.onError();
                //   console.error(this.NoError);
                if (flag) {
                    flag = false;
                    setTimeout(
                        () => {
                            //   console.log(' if x = 3 and y = 5 the the result equals to ')
                            let code = this.session.getValue();//+ 'add(3,5);';
                            let payload = {
                                code : code,
                                render: render
                            }
                            if (this.NoError) {
                                this.event.publish('OnEditorChanged', payload);
                            }
                            flag = true;
                        }, 2000)
                }
            });
                  console.info("ready");
        this.event.publish('onEditorReady', this.editor);
        this.editor.on("gutterclick", (e) => {
             const payload = e.getDocumentPosition().row+1;
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

        this.event.subscribe('onError', (NoError) => {
            //    console.log(`subscribe ${NoError}`)
            this.NoError = NoError;
        })
    }

}