export class Literal {
    name: string;
    constructor(name) {
        this.name = name;
    }
}

export class Command extends Literal { }
export class Register extends Literal { }
export class Label extends Literal { }

export class NumberLiteral extends Literal {
    value: number;
    constructor(value: number) {
        super(value.toString());
        this.value = value;
    }
}

export class Instruction {
    private static instructionRegex: RegExp = /^([A-Z]{1,10}\:)$|([A-Z]{3})[\s]{0,}([0-9\-]{1,}|[A-Z]{2,4}|[A-Z]{1,}\:)?[\s,]{0,}([A-Z]{2,4})?$/

    command: Command | Label;
    param1: Register | Label | NumberLiteral;
    param2: Register;

    empty: boolean = false;
    error: boolean = false;
    errorMessage: string = "";

    constructor(instruction: string) {
        try {
            this.parseInstruction(instruction);
        } catch (e) {
            this.error = true;
            this.errorMessage = e.message;
        }
    }

    private parseInstruction(line: string) {
        line = line.trim();
        line = line.toUpperCase();
        if (line.length == 0) {
            this.empty = true;
            return;
        }
        let result = Instruction.instructionRegex.exec(line);
        if (result == null) {
            throw new Error(`could not parse ${line}`);
        }
        if (result[1]) {
            this.command = new Label(result[1]);
        } else {
            this.command = this.parseCommand(result[2]);
            if (result[3]) {
                if (result[3].match(/[0-9\-]{1,}/)) {
                    this.param1 = new NumberLiteral(parseInt(result[3]));
                } else if (result[3].match(/[A-Z]{1,}\:/)) {
                    this.param1 = new Label(result[3]);
                } else {
                    this.param1 = this.parseRegister(result[3]);
                }
                if (result[4]) {
                    this.param2 = this.parseRegister(result[4]);
                }
            }
        }
        this.checkValidity();
    }

    private parseCommand(name: string): Command {
        switch (name) {
            case 'SAV':
            case 'SWP':
            case 'NEG':
            case 'NOP':
            case 'ADD':
            case 'SUB':
            case 'JEZ':
            case 'JLZ':
            case 'JGZ':
            case 'JNZ':
            case 'JMP':
            case 'MOV':
                return new Command(name);
            default:
                throw new Error(`could not parse command ${name}`);
        }
    }

    private parseRegister(name: string): Register {
        switch (name) {
            case 'ACC':
            case 'UP':
            case 'DOWN':
            case 'LEFT':
            case 'RIGHT':
            case 'NIL':
                return new Register(name);
            default:
                throw new Error(`could not parse register ${name}`);
        }
    }

    private checkValidity() {
        // single commands
        if (this.command.name === 'SAV' ||
            this.command.name === 'SWP' ||
            this.command.name === 'NEG' ||
            this.command.name === 'NOP') {
            if (this.param1 || this.param2) {
                throw new Error(`no additional parameter allowed`);
            }
        } 
        // calc commands (param1 = number | register)
        else if (
            this.command.name === 'ADD' ||
            this.command.name === 'SUB') {
            if (!this.param1 || this.param1 instanceof Label || this.param2) {
                throw new Error(`wrong parameter for this command`);
            }
        }
        // jump commands
        else if (
            this.command.name === 'JEZ' ||
            this.command.name === 'JLZ' ||
            this.command.name === 'JGZ' ||
            this.command.name === 'JNZ' ||
            this.command.name === 'JMP') {
            if (!(this.param1 instanceof Label)) {
                throw new Error(`parameter need to be a label`);
            }
        }
        // mov command
        else if (this.command.name === 'MOV') {
            if (!this.param1 || this.param1 instanceof Label || !(this.param2 instanceof Register)) {
                throw new Error(`MOV needs a Value or two registers`);
            }
        }
    }
}

