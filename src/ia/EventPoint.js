
import Point from "../Point.js";

export class EventPoint {

	constructor(canvas) {
		this._canvas = canvas;
	}
	
	getPoint(evt) {
		evt.preventDefault();
	    var rect = this._canvas.getBoundingClientRect();
		let pt = new Point(
				evt.clientX - rect.left,
				evt.clientY - rect.top
			);	
		return pt;
	}

}

