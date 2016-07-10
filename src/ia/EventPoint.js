
import { Point } from "../Point.js";

export class EventPoint {

	constructor(boundingRect) {
		this._boundingRect = boundingRect;
	}
	
	getPoint(evt) {
		evt.preventDefault();
		let pt = new Point(
				evt.clientX - this._boundingRect.left,
				evt.clientY - this._boundingRect.top
			);
	
		return pt;
		
	}

}

