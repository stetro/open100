export class Literal {
    name: string;
    constructor(name) {
        this.name = name;
    }
}

export class NumberLiteral extends Literal {
    value: number;
    constructor(value: number) {
        super(value.toString());
        this.value = value;
    }
}

export class Command extends Literal { }

export class Register extends Literal { }

export class Label extends Literal { }
