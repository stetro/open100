import {Instruction} from './instruction';
import {Literal, Command, Register, NumberLiteral, Label} from './literal';
import {Port} from './port';

export class Interpreter {

	labels: { [key: string]: number; } = {};
	lines: Array<Instruction> = [];

	empty: boolean = false;
	running: boolean = false;

	acc: number = 0;
	bak: number = 0;
	pc: number = 0;

	upin: Port;
    downin: Port;
    leftin: Port;
    rightin: Port;

    upout: Port;
    downout: Port;
    leftout: Port;
    rightout: Port;

	tick() {
		try {
			this.interpret();
			this.iteratePC();
		} catch (e) {
			// skip this instruction and don't iterate pc
		}
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

		if (this.upin) { this.upin.clear(); }
		if (this.downin) { this.downin.clear(); }
		if (this.leftin) { this.leftin.clear(); }
		if (this.rightin) { this.rightin.clear(); }

		if (this.upout) { this.upout.clear(); }
		if (this.downout) { this.downout.clear(); }
		if (this.leftout) { this.leftout.clear(); }
		if (this.rightout) { this.rightout.clear(); }

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
					this.acc = this.acc + this.readValue(line.param1);
					break;
				case 'SUB':
					this.acc = this.acc - this.readValue(line.param1);
					break;
				case 'JEZ':
					if (this.acc == 0) { this.pc = this.labels[line.param1.name]; }
					break;
				case 'JLZ':
					if (this.acc < 0) { this.pc = this.labels[line.param1.name]; }
					break;
				case 'JGZ':
					if (this.acc > 0) { this.pc = this.labels[line.param1.name]; }
					break;
				case 'JNZ':
					if (this.acc != 0) { this.pc = this.labels[line.param1.name]; }
					break;
				case 'JMP':
					this.pc = this.labels[line.param1.name];
					break;
				case 'MOV':
					this.writeToRegister(line.param2, this.readValue(line.param1));
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
				if (this.upin) { return this.upin.getValue(this); }
            case 'DOWN':
				if (this.downin) { return this.downin.getValue(this); }
            case 'LEFT':
				if (this.leftin) { return this.leftin.getValue(this); }
            case 'RIGHT':
				if (this.rightin) { return this.rightin.getValue(this); }
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
				if (this.upout) { this.upout.setValue(value, this); }
				break;
			case 'DOWN':
				if (this.downout) { this.downout.setValue(value, this); }
				break;
			case 'LEFT':
				if (this.leftout) { this.leftout.setValue(value, this); }
				break;
			case 'RIGHT':
				if (this.rightout) { this.rightout.setValue(value, this); }
				break;
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
			if (lines[i].command instanceof Label) {
				this.labels[lines[i].command.name] = i;
			}
		}
	}
}