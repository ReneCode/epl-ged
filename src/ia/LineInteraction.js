
import { Line } from '../Line.js';
import { databaseStore } from '../DatabaseStore.js';
import { drawCanvas } from '../DrawCanvas.js';

export class LineInteraction {
    constructor() {
        this._p1 = undefined;
    }

    getLine(pt) {
        let l = new Line(this._p1, pt);
        return l;
    }

    mousemove(pt) {
        if (this._p1 == undefined) {
            return;
        }
        // temporary line
        databaseStore.addItem(this.getLine(pt), true);
    }

    click(pt) {
        if (this._p1 == undefined) {
            this._p1 = pt;
        }
        else {
            databaseStore.addItem( this.getLine(pt) );
            this._p1 = undefined;
        }
    }
}