
import { Line } from '../Line.js'

export class LineInteraction {
    constructor(drawCanvas, storeCanvas) {
        this._p1 = undefined;
        this._drawCanvas = drawCanvas;
        this._storeCanvas = storeCanvas;
    }

    mousemove(pt) {
        if (this._p1 == undefined) {
            return;
        }
        this._drawCanvas.drawRubberLine( new Line(this._p1, pt) );
    }

    click(pt) {
        if (this._p1 == undefined) {
            this._p1 = pt;
        }
        else {
            this._storeCanvas.addLine( new Line(this._p1, pt) );
            this._p1 = undefined;
        }
    }
}