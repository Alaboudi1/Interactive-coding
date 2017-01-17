import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { DialogService } from 'aurelia-dialog';
import { Dialog } from './dialog';

@inject(EventAggregator, DialogService)
export class DialogControler {

  constructor(event, dialogService) {
    this.event = event;
    this.dialogService = dialogService;
  }

  dialogInit(functionName) {
    this.dialogService.openAndYieldController({ viewModel: Dialog, model: functionName })
      .then(controller => {controller.result.then((response) => {});});
  }


  subscribe() {
    this.event.subscribe('onDialogRequest', functionName => this.dialogInit(functionName));
  }
  publish(event, payload) {
    switch (event) {
    case 'onSaveTestCases':
      this.event.publish('onSaveTestCases', payload);
      break;
    default:
      break;
    }
  }
}
