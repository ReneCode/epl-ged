
import * as types from './actionTypes';
import {Line} from '../Line';
import {databaseStore} from '../DatabaseStore';

export class IaLine  {
    constructor(iaManager) {
        this._iaManager = iaManager;
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.onAction = this.onAction.bind(this);
    }

    start() {
        this._p1 = undefined;
        this._p2 = undefined;
        this._iaManager.subscribe(this.onAction);
        this._iaManager.start("IaPoint");
    }

    stop() {
        this._iaManager.stop("IaPoint");
        this._iaManager.unsubscribe(this.onAction);
    }


    drawRubberband(pt) {
        // temporary line
        databaseStore.addItem(new Line(this._p1, pt), true);
    }

    createLine() {
        databaseStore.addItem(new Line(this._p1, this._p2));
    }

    onAction(action) {
        switch (action.type) {
            case types.IaPointUpdate:
                if (this._p1) {
                    this.drawRubberband(action.data.point);
                }
                break;

            case types.IaPointClick:
                if (!this._p1) {
                    this._p1 = action.data.point;
                } else {
                    this._p2 = action.data.point;
                    this.createLine();
                    this._p1 = undefined;
                }
                break;

            case types.IaPointCancel:
                // stop myself
                this._iaManager.stop("IaLine");
                break;
                
        }
    }
}


