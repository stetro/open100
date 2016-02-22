System.register(['./literal'], function(exports_1) {
    var literal_1;
    var Interpreter;
    return {
        setters:[
            function (literal_1_1) {
                literal_1 = literal_1_1;
            }],
        execute: function() {
            Interpreter = (function () {
                function Interpreter() {
                    this.labels = {};
                    this.lines = [];
                    this.empty = false;
                    this.running = false;
                    this.acc = 0;
                    this.bak = 0;
                    this.pc = 0;
                }
                Interpreter.prototype.tick = function () {
                    try {
                        this.interpret();
                        this.iteratePC();
                    }
                    catch (e) {
                    }
                };
                Interpreter.prototype.start = function (lines) {
                    this.acc = 0;
                    this.bak = 0;
                    this.pc = -1;
                    this.empty = !lines.some(function (line) { return !line.empty; });
                    this.labels = {};
                    this.fillLabelLookupTable(lines);
                    this.lines = lines;
                    this.running = true;
                    if (this.upin) {
                        this.upin.clear();
                    }
                    if (this.downin) {
                        this.downin.clear();
                    }
                    if (this.leftin) {
                        this.leftin.clear();
                    }
                    if (this.rightin) {
                        this.rightin.clear();
                    }
                    if (this.upout) {
                        this.upout.clear();
                    }
                    if (this.downout) {
                        this.downout.clear();
                    }
                    if (this.leftout) {
                        this.leftout.clear();
                    }
                    if (this.rightout) {
                        this.rightout.clear();
                    }
                    this.iteratePC();
                };
                Interpreter.prototype.stop = function () {
                    this.running = false;
                };
                Interpreter.prototype.interpret = function () {
                    var line = this.lines[this.pc];
                    if (line.command instanceof literal_1.Command) {
                        switch (line.command.name) {
                            case 'SAV':
                                this.bak = this.acc;
                                break;
                            case 'SWP':
                                var tmp = this.acc;
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
                                this.writeToRegister(line.param2, this.readValue(line.param1));
                                break;
                        }
                    }
                };
                Interpreter.prototype.readValue = function (literal) {
                    if (literal instanceof literal_1.NumberLiteral) {
                        return parseInt(literal.name);
                    }
                    else {
                        return this.readFromRegister(literal);
                    }
                };
                Interpreter.prototype.readFromRegister = function (register) {
                    switch (register.name) {
                        case 'ACC':
                            return this.acc;
                        case 'UP':
                            if (this.upin) {
                                return this.upin.getValue(this);
                            }
                        case 'DOWN':
                            if (this.downin) {
                                return this.downin.getValue(this);
                            }
                        case 'LEFT':
                            if (this.leftin) {
                                return this.leftin.getValue(this);
                            }
                        case 'RIGHT':
                            if (this.rightin) {
                                return this.rightin.getValue(this);
                            }
                        case 'NIL':
                        default:
                            return 0;
                    }
                };
                Interpreter.prototype.writeToRegister = function (register, value) {
                    switch (register.name) {
                        case 'ACC':
                            this.acc = value;
                            break;
                        case 'UP':
                            if (this.upout) {
                                this.upout.setValue(value, this);
                            }
                            break;
                        case 'DOWN':
                            if (this.downout) {
                                this.downout.setValue(value, this);
                            }
                            break;
                        case 'LEFT':
                            if (this.leftout) {
                                this.leftout.setValue(value, this);
                            }
                            break;
                        case 'RIGHT':
                            if (this.rightout) {
                                this.rightout.setValue(value, this);
                            }
                            break;
                        case 'NIL':
                        default:
                    }
                };
                Interpreter.prototype.iteratePC = function () {
                    if (!this.empty) {
                        do {
                            this.pc = (this.pc + 1) % this.lines.length;
                        } while (this.lines[this.pc].empty ||
                            this.lines[this.pc].command instanceof literal_1.Label);
                    }
                };
                Interpreter.prototype.fillLabelLookupTable = function (lines) {
                    for (var i = 0; i < lines.length; ++i) {
                        if (lines[i].command instanceof literal_1.Label) {
                            this.labels[lines[i].command.name] = i;
                        }
                    }
                };
                return Interpreter;
            })();
            exports_1("Interpreter", Interpreter);
        }
    }
});
