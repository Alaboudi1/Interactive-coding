import {inject} from 'aurelia-framework';
import {Parser} from '../services/parser';
import {Traverse} from '../services/traverse';
import {Interpreter} from '../services/interpreter';
import {InfoSign} from '../services/info-sign';
import {Test} from '../services/test';


@inject(Parser, Traverse, Interpreter, InfoSign,Test)
export class Run {

    constructor(parser, traverse, interpreter, infoSign,test) {
        parser.subscribe();
        traverse.subscribe();
        interpreter.subscribe();
        infoSign.subscribe();
        test.subscribe();
        
    }

}