import {Component, Input, SimpleChange} from 'angular2/core';
import {Literal, Command, Register, NumberLiteral} from '../asm/literal';
import {Instruction} from '../asm/instruction';
import {Interpreter} from '../asm/interpreter';
import {Port} from '../asm/port';


@Component({
    selector: 'node',
    templateUrl: 'app/node/node.template.html'
})
export class Node {

    @Input() clock: number;
    @Input() running: boolean;

    @Input() upin: Port;
    @Input() downin: Port;
    @Input() leftin: Port;
    @Input() rightin: Port;

    @Input() upout: Port;
    @Input() downout: Port;
    @Input() leftout: Port;
    @Input() rightout: Port;

    lines: Array<Instruction> = [];
    numbers: Array<number> = [];
    maxLength: number = 12;
    length: number = 0;
    code: string = '';
    interpreter: Interpreter;

    constructor() {
        this.interpreter = new Interpreter();
        this.parse();
    }

    ngAfterViewInit() {
        this.interpreter.upin = this.upin;
        this.interpreter.downin = this.downin;
        this.interpreter.leftin = this.leftin;
        this.interpreter.rightin = this.rightin;
        this.interpreter.upout = this.upout;
        this.interpreter.downout = this.downout;
        this.interpreter.leftout = this.leftout;
        this.interpreter.rightout = this.rightout;
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['clock'] && this.interpreter.running) {
            this.interpreter.tick()
        }
        if (changes['running']) {
            if (changes['running'].currentValue) {
                let error = this.lines.some(instruction => instruction.error);
                if (!error) {
                    this.interpreter.start(this.lines);
                }
            } else {
                this.interpreter.stop();
            }
        }
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
}
