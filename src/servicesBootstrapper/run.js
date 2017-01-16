import {inject} from 'aurelia-framework';
import {Parser} from '../services/parser';
import {Traverse} from '../services/traverse';
import {InfoSign} from '../services/info-sign';
import {Test} from '../services/test';
import { Schema } from '../resources/schema';
import {DialogControler} from '../dialog/dialog-controler';
import {Evaluator} from '../services/evaluator';

@inject(Parser, Traverse, InfoSign, Test, Schema, DialogControler, Evaluator)
export class Run {

  constructor(parser, traverse, infoSign, test, schema, dialogControler, evaluator) {
    parser.subscribe();
    traverse.subscribe(schema);
    infoSign.subscribe();
    test.subscribe();
    dialogControler.subscribe();
    evaluator.subscribe();
  }

}
