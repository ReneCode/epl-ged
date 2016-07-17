
import * as types from './actionTypes';
import {Line} from '../Line';
import {databaseStore} from '../DatabaseStore';
import status from '../status/status';
import IaBase from './IaBase';

export class IaLine extends IaBase {
    constructor(iaManager) {
        super(iaManager);
    }

    start() {
        this._p1 = undefined;
        this._p2 = undefined;
        this.startInteraction("IaPoint");
    }

    drawRubberband(pt) {
        // temporary line
        databaseStore.addItem(new Line(this._p1, pt), true);
    }

    createLine() {
        databaseStore.addItem(new Line(this._p1, this._p2));
        status.addText("Line added");  
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


