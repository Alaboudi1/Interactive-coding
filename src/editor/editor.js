
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {Run} from '../servicesBootstrapper/run';
@inject(EventAggregator, Run)
export class Editor {

  constructor(event) {
    this.event = event;
  }
  attached() {
    this.editor = ace.edit('editor');
    this.editor.$blockScrolling = Infinity;
    this.editor.setTheme('ace/theme/chrome');
    this.editor.getSession().setMode('ace/mode/javascript');
    this.session = this.editor.getSession();
    this.session.setValue(
    `function add (x,y){
            return x+y;
        }
        
    function remove (x,y){
            return x-y;
        }   
        
   function getSmallestElement (g){
        var small = g[0];
        for(var i=1; i< g.length; i++){
            if(small > g[i])
              small = g[i];
        }
            return small; 
        }  
    function oddOreven(f){
            if(f%2 ===0){
                return "even";
            }
            else{
                return "odd";
            }
        }  `);
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
                    code: code
                  };
                  if (this.NoError) {
                    this.event.publish('onEditorChanged', payload);
                  }
                  flag = true;
                }, 1000);
              }
            });


    this.editor.on('gutterclick', e => {
      const row = e.getDocumentPosition().row;
      try {
        const func = this.editor.session.doc.getAllLines()[row].trim(); // get function foo (x,y) without space
        const funcName = /^function\s+([\w\$]+)\s*\(/.exec(func.toString())[1]; //get function name
        this.event.publish('onDialogRequest', funcName);
      } catch (error) {
        return;
      }
    });
    setTimeout(_=>{
      this.event.publish('onEditorChanged', {code: this.editor.getValue()});
    }, 2000);
  }

  onError() {
    const event = this.event;
    this.session.on('changeAnnotation', _ => {
      let NoError = true;
      const annot = this.session.getAnnotations();
      for (let key in annot) {
        if (annot.hasOwnProperty(key)) {
          NoError = !NoError;
          break;
        }
      }
      if (this.NoError !== NoError)              {
        event.publish('onError', NoError);
      }
    });
  }

  subscribe() {
    this.event.subscribe('onError', payload => {
      this.NoError = payload;
    });

    this.event.subscribe('setBreakpointRequest', payload => {
      this.session.clearBreakpoints();

      for (let [key, value] of payload)              {
        if (value.sign.testCasesCount)                {
          this.session.setBreakpoint(value.location, value.sign.cssClass);
        }
      }
    });

    this.event.subscribe('setAnnotations', payload => {
      this.session.setAnnotations(payload);
    });
  }
}
