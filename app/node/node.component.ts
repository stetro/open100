import {Component} from 'angular2/core';
import {Instruction} from '../asm/instruction';

@Component({
    selector: 'node',
    templateUrl: 'app/node/node.template.html'
})
export class Node {
    lines: Array<string> = [];
    numbers: Array<number> = [];
    count: number = 12;


    constructor() {
        for (var i = 0; i < this.count; ++i) {
            this.lines[i] = '';
            this.numbers[i] = i + 1;
        }
    }

    parse() {

    }
}
