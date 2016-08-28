import {inject} from 'aurelia-framework';
import {Parser} from '../services/parser';
import {Traverse} from '../services/traverse';
import {Interpreter} from '../services/interpreter';
@inject(Parser, Traverse, Interpreter)
export class Run {

    constructor(parser, traverse, interpreter) {
        parser.subscribe();
        traverse.subscribe();
        interpreter.subscribe();
        
    }

}