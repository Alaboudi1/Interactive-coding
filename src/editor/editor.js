import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
@inject(EventAggregator)
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
    this.flag = true;
    this.subscribe();
    setTimeout(_ => {this.publishCode();}, 2000);
  }

  publishCode() {
    const code = this.session.getValue();
    if (this.hasNoError) {
      this.event.publish('onEditorChanged', code);
    }
    this.flag = true;
  }
  onEditorChange() {
    if (this.flag) {
      this.flag = false;
      setTimeout(_ => {this.publishCode();}, 1000);
    }
  }
  checkError() {
    this.hasNoError = true;
    const annot = this.session.getAnnotations();
    for (let elem of annot) {
      if (elem.type === 'error') {
        this.hasNoError = false;
        break;
      }
    }
  }
  changeEditorValue(code) {
    this.session.setValue(code);
    console.log
  }
  onSetBreakpointRequest(signs) {
    this.session.clearBreakpoints();
    for (let [_, status] of signs) {
      if (status.sign.testCasesCount) {
        this.session.setBreakpoint(status.location, status.sign.cssClass);
      } else {
        this.session.setBreakpoint(status.location, 'warning');
      }
    }
  }
  onGutterclick(click) {
    const row = click.getDocumentPosition().row;
    try {
      const func = this.editor.session.doc.getAllLines()[row].trim(); // get function foo (x,y) without space
      const funcName = /^function\s+([\w\$]+)\s*\(/.exec(func.toString())[1]; //get function name
      this.event.publish('onDialogRequest', funcName);
    } catch (exception) {
      return;
    }
  }
  subscribe() {
    this.session.on('changeAnnotation', _ => this.checkError());
    this.event.subscribe('onSetBreakpointRequest', signs => this.onSetBreakpointRequest(signs));
    this.event.subscribe('setAnnotations', annot => this.session.setAnnotations(annot));
    this.event.subscribe('onRefershRequest', _ => this.publishCode());
    this.event.subscribe('onCodeChangeRequest', payload => this.changeEditorValue(payload.code));
    this.editor.session.on('change', _ => this.onEditorChange());
    this.editor.on('gutterclick', click => this.onGutterclick(click));
  }
}
