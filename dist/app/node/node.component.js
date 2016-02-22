System.register(['angular2/core', '../asm/instruction', '../asm/interpreter', '../asm/port'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, instruction_1, interpreter_1, port_1;
    var Node;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (instruction_1_1) {
                instruction_1 = instruction_1_1;
            },
            function (interpreter_1_1) {
                interpreter_1 = interpreter_1_1;
            },
            function (port_1_1) {
                port_1 = port_1_1;
            }],
        execute: function() {
            Node = (function () {
                function Node() {
                    this.lines = [];
                    this.numbers = [];
                    this.maxLength = 12;
                    this.length = 0;
                    this.code = '';
                    this.interpreter = new interpreter_1.Interpreter();
                    this.parse();
                }
                Node.prototype.ngAfterViewInit = function () {
                    this.interpreter.upin = this.upin;
                    this.interpreter.downin = this.downin;
                    this.interpreter.leftin = this.leftin;
                    this.interpreter.rightin = this.rightin;
                    this.interpreter.upout = this.upout;
                    this.interpreter.downout = this.downout;
                    this.interpreter.leftout = this.leftout;
                    this.interpreter.rightout = this.rightout;
                };
                Node.prototype.ngOnChanges = function (changes) {
                    if (changes['clock'] && this.interpreter.running) {
                        this.interpreter.tick();
                    }
                    if (changes['running']) {
                        if (changes['running'].currentValue) {
                            var error = this.lines.some(function (instruction) { return instruction.error; });
                            if (!error) {
                                this.interpreter.start(this.lines);
                            }
                        }
                        else {
                            this.interpreter.stop();
                        }
                    }
                };
                Node.prototype.parse = function () {
                    var codelines = this.code.split("\n");
                    if (codelines.length > this.maxLength) {
                        codelines = codelines.slice(0, this.maxLength);
                    }
                    this.code = codelines.join("\n").toUpperCase();
                    this.lines = codelines.map(function (line) { return new instruction_1.Instruction(line); });
                    this.length = this.lines.length;
                    this.numbers = [];
                    for (var i = 0; i < this.length; ++i) {
                        this.numbers[i] = i + 1;
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], Node.prototype, "clock", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Node.prototype, "running", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', port_1.Port)
                ], Node.prototype, "upin", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', port_1.Port)
                ], Node.prototype, "downin", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', port_1.Port)
                ], Node.prototype, "leftin", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', port_1.Port)
                ], Node.prototype, "rightin", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', port_1.Port)
                ], Node.prototype, "upout", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', port_1.Port)
                ], Node.prototype, "downout", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', port_1.Port)
                ], Node.prototype, "leftout", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', port_1.Port)
                ], Node.prototype, "rightout", void 0);
                Node = __decorate([
                    core_1.Component({
                        selector: 'node',
                        templateUrl: 'app/node/node.template.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], Node);
                return Node;
            })();
            exports_1("Node", Node);
        }
    }
});
