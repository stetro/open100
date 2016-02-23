var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Literal = (function () {
    function Literal(name) {
        this.name = name;
    }
    return Literal;
})();
exports.Literal = Literal;
var NumberLiteral = (function (_super) {
    __extends(NumberLiteral, _super);
    function NumberLiteral(value) {
        _super.call(this, value.toString());
        this.value = value;
    }
    return NumberLiteral;
})(Literal);
exports.NumberLiteral = NumberLiteral;
var Command = (function (_super) {
    __extends(Command, _super);
    function Command() {
        _super.apply(this, arguments);
    }
    return Command;
})(Literal);
exports.Command = Command;
var Register = (function (_super) {
    __extends(Register, _super);
    function Register() {
        _super.apply(this, arguments);
    }
    return Register;
})(Literal);
exports.Register = Register;
var Label = (function (_super) {
    __extends(Label, _super);
    function Label() {
        _super.apply(this, arguments);
    }
    return Label;
})(Literal);
exports.Label = Label;
