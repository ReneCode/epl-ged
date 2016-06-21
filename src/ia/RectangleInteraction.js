
import { Rectangle } from '../Rectangle.js'
import { databaseStore } from '../DatabaseStore.js'

export class RectangleInteraction {
    constructor() {
        this._p1 = undefined;
    }

    getRectangle(pt) {
        let r = new Rectangle(this._p1, 
            {   w: pt.x - this._p1.x,
                h: pt.y - this._p1.y });
        return r;
    }

    mousemove(pt) {
        if (this._p1 == undefined) {
            return;
        }
        // temporary line
        databaseStore.addItem(this.getRectangle(pt), true);
    }

    click(pt) {
        if (this._p1 == undefined) {
            this._p1 = pt;
        }
        else {
            databaseStore.addItem( this.getRectangle(pt) );
            this._p1 = undefined;
        }
    }
}