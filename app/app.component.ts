import {Component} from 'angular2/core';
import {Node} from './node/node.component';

@Component({
    selector: 'open100',
    templateUrl: 'app/app.template.html',
    directives: [Node]
})
export class AppComponent {
	constructor() {

	}
}
