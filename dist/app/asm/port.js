System.register([], function(exports_1) {
    var Port;
    return {
        setters:[],
        execute: function() {
            Port = (function () {
                function Port() {
                    this.filled = false;
                    this.claimed = false;
                }
                Port.prototype.setValue = function (value, sender) {
                    this.value = value;
                    if (!this.claimed) {
                        throw new Error('port is not claimed but now filled');
                    }
                    this.filled = true;
                };
                Port.prototype.getValue = function (receiver) {
                    if (this.filled) {
                        this.filled = false;
                        this.claimed = false;
                        var value = this.value;
                        this.value = undefined;
                        return value;
                    }
                    else {
                        this.claimed = true;
                        throw new Error('port is not filled but now claimed');
                    }
                };
                Port.prototype.clear = function () {
                    this.value = undefined;
                    this.filled = false;
                    this.claimed = false;
                };
                return Port;
            })();
            exports_1("Port", Port);
        }
    }
});
