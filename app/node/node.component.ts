import {Component} from 'angular2/core';
import {Instruction, Command, Register, Label} from '../asm/instruction';

@Component({
    selector: 'node',
    templateUrl: 'app/node/node.template.html'
})
export class Node {
    lines: Array<Instruction> = [];
    numbers: Array<number> = [];
    maxLength: number = 12;
    code: string;

    constructor() {
        for (var i = 0; i < this.maxLength; ++i) {
            this.numbers[i] = i + 1;
        }
    }

    parse() {
        let codelines = this.code.split("\n");
        if (codelines.length > this.maxLength) {
            codelines = codelines.slice(0, this.maxLength);
        }
        this.code = codelines.join("\n");
        this.lines = codelines.map(line => new Instruction(line));
    }
}
