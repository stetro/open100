var literal_1 = require('./literal');
var Instruction = (function () {
    function Instruction(instruction) {
        this.empty = false;
        this.error = false;
        this.errorMessage = "";
        try {
            this.parseInstruction(instruction);
        }
        catch (e) {
            this.error = true;
            this.errorMessage = e.message;
        }
    }
    Instruction.prototype.parseInstruction = function (line) {
        line = line.trim();
        line = line.toUpperCase();
        if (line.length == 0) {
            this.empty = true;
            return;
        }
        var result = Instruction.instructionRegex.exec(line);
        if (result == null) {
            throw new Error("could not parse " + line);
        }
        if (result[1]) {
            this.command = new literal_1.Label(result[1]);
        }
        else {
            this.command = this.parseCommand(result[2]);
            if (result[3]) {
                if (result[3].match(/[0-9\-]{1,}/)) {
                    this.param1 = new literal_1.NumberLiteral(parseInt(result[3]));
                }
                else if (result[3].match(/[A-Z]{1,}\:/)) {
                    this.param1 = new literal_1.Label(result[3]);
                }
                else {
                    this.param1 = this.parseRegister(result[3]);
                }
                if (result[4]) {
                    this.param2 = this.parseRegister(result[4]);
                }
            }
        }
        this.checkValidity();
    };
    Instruction.prototype.parseCommand = function (name) {
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
                return new literal_1.Command(name);
            default:
                throw new Error("could not parse command " + name);
        }
    };
    Instruction.prototype.parseRegister = function (name) {
        switch (name) {
            case 'ACC':
            case 'UP':
            case 'DOWN':
            case 'LEFT':
            case 'RIGHT':
            case 'NIL':
                return new literal_1.Register(name);
            default:
                throw new Error("could not parse register " + name);
        }
    };
    Instruction.prototype.checkValidity = function () {
        // single commands
        if (this.command.name === 'SAV' ||
            this.command.name === 'SWP' ||
            this.command.name === 'NEG' ||
            this.command.name === 'NOP') {
            if (this.param1 || this.param2) {
                throw new Error("no additional parameter allowed");
            }
        }
        else if (this.command.name === 'ADD' ||
            this.command.name === 'SUB') {
            if (!this.param1 || this.param1 instanceof literal_1.Label || this.param2) {
                throw new Error("wrong parameter for this command");
            }
        }
        else if (this.command.name === 'JEZ' ||
            this.command.name === 'JLZ' ||
            this.command.name === 'JGZ' ||
            this.command.name === 'JNZ' ||
            this.command.name === 'JMP') {
            if (!(this.param1 instanceof literal_1.Label)) {
                throw new Error("parameter need to be a label");
            }
        }
        else if (this.command.name === 'MOV') {
            if (!this.param1 || this.param1 instanceof literal_1.Label || !(this.param2 instanceof literal_1.Register)) {
                throw new Error("MOV needs a Value or two registers");
            }
        }
    };
    Instruction.instructionRegex = /^([A-Z]{1,10}\:)$|([A-Z]{3})[\s]{0,}([0-9\-]{1,}|[A-Z]{2,5}|[A-Z]{1,}\:)?[\s,]{0,}([A-Z]{2,5})?$/;
    return Instruction;
})();
exports.Instruction = Instruction;
