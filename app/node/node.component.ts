import {Component} from 'angular2/core';
import {Instruction, Command, Register, Label} from '../asm/instruction';
import {Interpreter} from '../asm/interpreter';

@Component({
    selector: 'node',
    templateUrl: 'app/node/node.template.html'
})
export class Node {
    lines: Array<Instruction> = [];
    numbers: Array<number> = [];
    maxLength: number = 12;
    length: number = 0;
    code: string;
    interpreter: Interpreter;

    constructor() {
        this.interpreter = new Interpreter()
    }

    parse() {
        let codelines = this.code.split("\n");
        if (codelines.length > this.maxLength) {
            codelines = codelines.slice(0, this.maxLength);
        }
        this.code = codelines.join("\n").toUpperCase();
        this.lines = codelines.map(line => new Instruction(line));
        this.length = this.lines.length;
        this.numbers = [];
        for (var i = 0; i < this.length; ++i) {
            this.numbers[i] = i + 1;
        }
    }

    toggleStatus() {
        let error = this.lines.some(instruction => instruction.error);
        if (this.interpreter.running) {
            this.interpreter.stop();
        } else if (!error) {
            this.interpreter.start(this.lines);
        }
    }

    tick() {
        this.interpreter.tick()
    }
}
