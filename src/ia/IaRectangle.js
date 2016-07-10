
import * as types from './actionTypes';
import { Rectangle } from '../Rectangle.js';
import { databaseStore } from '../DatabaseStore.js';


export class IaRectangle {
    constructor(iaManager) {
        this._iaManager = iaManager;
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.onAction = this.onAction.bind(this);
    }

    start() {
        this._p1 = undefined;
        this._iaManager.subscribe(this.onAction);
        this._iaManager.start("IaPoint");
    }

    stop() {
        this._iaManager.stop("IaPoint");
        this._iaManager.unsubscribe(this.onAction);
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