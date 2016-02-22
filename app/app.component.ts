import {Component} from 'angular2/core';
import {Node} from './node/node.component';
import {Port} from './asm/port';


@Component({
    selector: 'open100',
    templateUrl: 'app/app.template.html',
    directives: [Node]
})
export class AppComponent {

	clock: number;
	running: boolean;
	ports: { [index: number]: { [index: number]: Port; }; } = [];
	indices: Array<number> = [];
	columns: number = 4;
	rows: number = 4;
	interval: number = 1000;

	constructor() {
		this.clock = 0;
		this.running = false;
		this.generatePorts();
	}

	tick() {
		if (this.running) {
			this.clock++;
			window.setTimeout(_=> this.tick(), this.interval);
		}
	}

	start() {
		this.running = !this.running;
		if (this.running) {
			window.setTimeout(_=> this.tick(), this.interval);
		}
	}

	private generatePorts() {
		for (var i = -this.columns; i < this.columns * this.rows + this.columns; ++i) {
			this.ports[i] = {};
		}
		for (var i = 0; i < this.columns * this.rows; i++) {
			this.indices.push(i);
			let x = i % this.columns;
			let y = Math.floor(i / this.columns);
			this.ports[i][0] = (y > 0) ? new Port() : undefined;
			this.ports[i][1] = (y < this.rows - 1) ? new Port() : undefined;
			this.ports[i][2] = (x > 0) ? new Port() : undefined;
			this.ports[i][3] = (x < this.columns - 1) ? new Port() : undefined;
		}
	}
}
