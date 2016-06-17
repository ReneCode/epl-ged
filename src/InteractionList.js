

import { Point } from "./Point.js"

export class InteractionList {

	constructor(boundingRect) {
		this.interactions = [];
		this.boundingRect = boundingRect;
	}
	add(ia) {
		this.interactions.push(ia);
	}

	mousemove(evt) {
		evt.preventDefault();
		let pt = new Point(
				evt.clientX - this.boundingRect.left,
				evt.clientY - this.boundingRect.top
			);
	
		this.interactions.forEach( function(ia) {
			if (ia.mousemove) {
				ia.mousemove(pt);
			}
		});
	}

	click(evt) {
		evt.preventDefault();
		let pt = new Point(
				evt.clientX - this.boundingRect.left,
				evt.clientY - this.boundingRect.top
			);
	
		this.interactions.forEach( function(ia) {
			if (ia.click) {
				ia.click(pt);
			}
		});
	}


}
