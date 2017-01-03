import {inject} from 'aurelia-framework';
import {Parser} from '../services/parser';
import {Traverse} from '../services/traverse';
import {InfoSign} from '../services/info-sign';
import {Test} from '../services/test';
import { Schema } from '../resources/schema';


@inject(Parser, Traverse, InfoSign, Test, Schema)
export class Run {

  constructor(parser, traverse, infoSign, test, schema) {
    parser.subscribe();
    traverse.subscribe(schema);
    infoSign.subscribe();
    test.subscribe();
  }

}
