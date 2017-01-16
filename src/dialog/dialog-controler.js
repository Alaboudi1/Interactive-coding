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

  dialogInit(functionObject) {
    this.dialogService.openAndYieldController({ viewModel: Dialog, model: functionObject })
      .then(controller => {
        controller.result
          .then((response) => {
            if (!response.wasCancelled) {
              this.publish('onSaveTestCases', response.output);
            }
          });
      });
  }

  subscribe() {
    this.event.subscribe('onDialoginit', functionObject => this.dialogInit(functionObject));
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
