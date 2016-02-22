System.register([], function(exports_1) {
    var Status;
    return {
        setters:[],
        execute: function() {
            Status = (function () {
                function Status() {
                    this.clock = 0;
                    this.running = false;
                }
                return Status;
            })();
            exports_1("Status", Status);
        }
    }
});
