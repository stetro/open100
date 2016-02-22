import {Interpreter} from './interpreter';

export class Port {
	filled: boolean = false;
	claimed: boolean = false;
	value: number;

	setValue(value: number, sender: Interpreter) {
		this.value = value;
		if (!this.claimed) {
			throw new Error('port is not claimed but now filled');
		}
		this.filled = true;
	}

	getValue(receiver: Interpreter): number {
		if (this.filled) {
			this.filled = false;
			this.claimed = false;
			let value = this.value;
			this.value = undefined;
			return value;
		} else {
			this.claimed = true;
			throw new Error('port is not filled but now claimed');
		}
	}

	clear() {
		this.value = undefined;
		this.filled = false;
		this.claimed = false;
	}
}