
import * as types from './actionTypes';
import { Rectangle } from '../Rectangle.js';
import { databaseStore } from '../DatabaseStore.js';
import IaBase from './IaBase';

export class IaRectangle extends IaBase {
    constructor(iaManager) {
        super(iaManager);
    }

    start() {
        this._p1 = undefined;
        this.startInteraction("IaPoint");
    }

    createRectangle(pt, temporary=false) {
        databaseStore.addItem(new Rectangle(
                this._p1, 
                {   w: pt.x - this._p1.x, 
                    h: pt.y - this._p1.y }), 
                temporary);
    }

    onAction(action) {
        switch (action.type) {
            case types.IaPointUpdate:
                if (this._p1) {
                    this.createRectangle(action.data.point, true);
                }
                break;
            case types.IaPointClick:
                if (!this._p1) {
                    this._p1 = action.data.point;                   
                }
                else {
                    this.createRectangle(action.data.point);
                    // restart on waiting for first point
                    this._p1 = undefined;
                }
                break;

            case types.IaPointCancel:
                this._iaManager.stop("IaRectangle");
                break;
        }
    }


}