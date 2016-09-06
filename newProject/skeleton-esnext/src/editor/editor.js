
import {EventAggregator} from 'aurelia-event-aggregator'
import {inject} from 'aurelia-framework'

@inject(EventAggregator)
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
        this.session.on('change',
            () => {
                this.onError();
                //   console.error(this.NoError);
                if (flag) {
                    flag = false;
                    setTimeout(
                        () => {
                            //   console.log(' if x = 3 and y = 5 the the result equals to ')
                            let code = this.session.getValue();//+ 'add(3,5);';
                            if (this.NoError) {
                                this.event.publish('OnEditorChanged', code);
                            }
                            flag = true;
                        }, 2000)
                }
            });

        this.event.publish('onEditorReady', this.editor);
        this.editor.renderer.on("afterRender", (e,render)=> {
            this.event.publish("onSignRequest",render);
        });

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