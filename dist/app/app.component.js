System.register(['angular2/core', './node/node.component', './asm/port'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, node_component_1, port_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (node_component_1_1) {
                node_component_1 = node_component_1_1;
            },
            function (port_1_1) {
                port_1 = port_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.ports = [];
                    this.indices = [];
                    this.columns = 4;
                    this.rows = 4;
                    this.interval = 1000;
                    this.clock = 0;
                    this.running = false;
                    this.generatePorts();
                }
                AppComponent.prototype.tick = function () {
                    var _this = this;
                    if (this.running) {
                        this.clock++;
                        window.setTimeout(function (_) { return _this.tick(); }, this.interval);
                    }
                };
                AppComponent.prototype.start = function () {
                    var _this = this;
                    this.running = !this.running;
                    if (this.running) {
                        window.setTimeout(function (_) { return _this.tick(); }, this.interval);
                    }
                };
                AppComponent.prototype.generatePorts = function () {
                    for (var i = -this.columns; i < this.columns * this.rows + this.columns; ++i) {
                        this.ports[i] = {};
                    }
                    for (var i = 0; i < this.columns * this.rows; i++) {
                        this.indices.push(i);
                        var x = i % this.columns;
                        var y = Math.floor(i / this.columns);
                        this.ports[i][0] = (y > 0) ? new port_1.Port() : undefined;
                        this.ports[i][1] = (y < this.rows - 1) ? new port_1.Port() : undefined;
                        this.ports[i][2] = (x > 0) ? new port_1.Port() : undefined;
                        this.ports[i][3] = (x < this.columns - 1) ? new port_1.Port() : undefined;
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'open100',
                        templateUrl: 'app/app.template.html',
                        directives: [node_component_1.Node]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
