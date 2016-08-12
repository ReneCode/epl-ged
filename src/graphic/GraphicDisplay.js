

import CoordinateTransform from '../common/CoordinateTransform';
import DrawCanvas from './DrawCanvas';
import EventPoint from './EventPoint';

class GraphicDisplay {
	init(canvas) {
		this._canvas = canvas;
		this._targetCtx = this._canvas.getContext('2d');
		this._coordinateTransform = new CoordinateTransform();
		this._coordinateTransform.setViewport(0,0,1000,1000);

		this._drawCanvas = new DrawCanvas();
		this._drawCanvas.init(this._targetCtx, this._coordinateTransform);

		this._eventPoint = new EventPoint(canvas);
	}

	resizeCanvas() {
		// strech canvas to the full size of the div 'article'
		let w = $("article").width();
		let h = $("article").height();
		$("#canvas").attr( 'width', w );
		$("#canvas").attr( 'height', h );

		let rect = this._canvas.getBoundingClientRect();
		this._coordinateTransform.setDevice(rect.right - rect.left,  
								rect.bottom - rect.top);

		this._drawCanvas.resize(rect.right - rect.left, 
					rect.bottom - rect.top);
	}

	// view = {x, y, w, h}
	setViewport(view) {
		this._coordinateTransform.setViewport(view.x, view.y, 
							view.x + view.w, view.y + view.h);
	}

	setDirty() {
		this._drawCanvas.setDirty();
	}

	clear() {
		this._drawCanvas.clear();
	}

	show() {
		this._drawCanvas.show();
	}

	drawItems(items) {
		this._drawCanvas.drawItems(items);
	}

	transformWorldToDevice(pt) {
		return this._coordinateTransform.worldToDevice(pt);
	}


	transformDeviceToWorld(pt) {
		return this._coordinateTransform.deviceToWorld(pt);
	}

	getDevicePoint(evt) {
		return this._eventPoint.getPoint(evt);
	}

}




export default new GraphicDisplay();