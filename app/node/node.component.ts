import {Component} from 'angular2/core';
import {Instruction} from '../asm/instruction';

@Component({
    selector: 'node',
    templateUrl: 'app/node/node.template.html'
})
export class Node {
    lines: Array<string> = [];
    count: number=10;

	constructor(){
		for (var i = 0; i < this.count; ++i) {
			this.lines[i] = '';
		}
	}

    parse() {
        
    }
}
