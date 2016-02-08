import {Instruction, Literal, Label, Register, Command, NumberLiteral} from './instruction';

export class Interpreter {

	labels: { [key: string]: number; } = {};
	lines: Array<Instruction> = [];

	empty: boolean = false;
	running: boolean = false;

	acc: number = 0;
	bak: number = 0;
	pc: number = 0;

	tick() {
		this.interpret();
		this.iteratePC();
	}

	start(lines: Array<Instruction>) {
		this.acc = 0;
		this.bak = 0;
		this.pc = -1;

		this.empty = !lines.some(line => !line.empty);
		this.labels = {};
		this.fillLabelLookupTable(lines);
		this.lines = lines;
		this.running = true;

		this.iteratePC();

	}

	stop() {
		this.running = false;
	}

	private interpret() {
		let line = this.lines[this.pc];
		if (line.command instanceof Command) {
			switch (line.command.name) {
				case 'SAV':
					this.bak = this.acc;
					break;
				case 'SWP':
					let tmp = this.acc;
					this.acc = this.bak;
					this.bak = tmp;
					break;
				case 'NEG':
					this.acc = -this.acc;
					break;
				case 'NOP':
					break;
				case 'ADD':
					{
						let value = this.readValue(line.param1);
						this.acc = this.acc + value;
					}
					break;
				case 'SUB':
					{
						let value = this.readValue(line.param1);
						this.acc = this.acc - value;
					}
					break;
				case 'JEZ':
					if (this.acc == 0) {
						this.pc = this.labels[line.param1.name];
					}
					break;
				case 'JLZ':
					if (this.acc < 0) {
						this.pc = this.labels[line.param1.name];
					}
					break;
				case 'JGZ':
					if (this.acc > 0) {
						this.pc = this.labels[line.param1.name];
					}
					break;
				case 'JNZ':
					if (this.acc != 0) {
						this.pc = this.labels[line.param1.name];
					}
					break;
				case 'JMP':
					this.pc = this.labels[line.param1.name];
					break;
				case 'MOV':
					{
						let value = this.readValue(line.param1);
						this.writeToRegister(line.param2, value);
					}
					break;
			}
		}
	}

	private readValue(literal: Literal): number {
		if (literal instanceof NumberLiteral) {
			return parseInt(literal.name);
		} else {
			return this.readFromRegister(literal);
		}
	}

	private readFromRegister(register: Register): number {
		switch (register.name) {
            case 'ACC':
				return this.acc;
            case 'UP':
            case 'DOWN':
            case 'LEFT':
            case 'RIGHT':
            case 'NIL':
            default:
                return 0;
        }
	}

	private writeToRegister(register: Register, value: number) {
		switch (register.name) {
            case 'ACC':
				this.acc = value;
				break;
            case 'UP':
            case 'DOWN':
            case 'LEFT':
            case 'RIGHT':
            case 'NIL':
            default:

        }
	}

	private iteratePC() {
		if (!this.empty) {
			do {
				this.pc = (this.pc + 1) % this.lines.length;
			} while (
				this.lines[this.pc].empty ||
				this.lines[this.pc].command instanceof Label)
		}
	}

	private fillLabelLookupTable(lines: Array<Instruction>) {
		for (var i = 0; i < lines.length; ++i) {
			console.log(lines);
			if (lines[i].command instanceof Label) {
				this.labels[lines[i].command.name] = i;
			}
		}
	}
}