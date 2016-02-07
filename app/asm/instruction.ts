
export enum Command { ADD, SUB, MOV, JEZ }

export enum Register { ACC, UP, DOWN, LEFT, RIGHT, NIL }

export interface Label { name: string; }

export class Instruction {
    private static instructionRegex: RegExp = /^([A-Z]{1,10}\:)$|([A-Z]{3})[\s]{1,}([A-Z0-9]{1,})[\s,]{0,}([A-Z]{2,4})?$/

    command: Command | Label;
    param1: Register | number;
    param2: Register;
    error: boolean = false;
    errorMessage: string = "";
    empty: boolean = false;

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
            throw new Error(`Could not parse ${line}`);
        }
        if (result[1]) {
            this.command = { name: result[1] };
        } else {
            this.command = this.parseCommand(result[2]);
            if (result[3].match(/[0-9]{0,4}/)) {
                this.param1 = parseInt(result[2]);
            } else {
                this.param1 = this.parseRegister(result[2]);
            }
            if (result[4]) {
                this.param2 = this.parseRegister(result[3]);
            }
        } 
   }

    private parseCommand(name: string): Command {
        switch (name) {
            case 'ADD':
                return Command.ADD;
            case 'SUB':
                return Command.SUB;
            case 'MOV':
                return Command.MOV;
            case 'JEZ':
                return Command.JEZ;
            default:
                throw new Error(`Could not parse Command ${name}`);
        }
    }

    private parseRegister(name: string): Register {
        switch (name) {
            case 'ACC':
                return Register.ACC;
            case 'UP':
                return Register.UP;
            case 'DOWN':
                return Register.DOWN;
            case 'LEFT':
                return Register.LEFT;
            case 'RIGHT':
                return Register.RIGHT;
            case 'NIL':
                return Register.NIL;
            default:
                throw new Error(`Could not parse Register ${name}`);
        }
    }
}

