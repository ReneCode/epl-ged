
import { Line } from '../Line.js'
import { databaseStore } from '../DatabaseStore.js'

export class LineInteraction {
    constructor(drawCanvas) {
        this._p1 = undefined;
        this._drawCanvas = drawCanvas;
    }


    getLine(pt) {
        let l = new Line();
        l.initFromPoints(this._p1, pt);
        return l;
    }

    mousemove(pt) {
        if (this._p1 == undefined) {
            return;
        }
        this._drawCanvas.drawRubberLine(this.getLine(pt));
    }

    click(pt) {
        if (this._p1 == undefined) {
            this._p1 = pt;
        }
        else {
            databaseStore.addLine( this.getLine(pt) );
            this._p1 = undefined;
        }
    }
}