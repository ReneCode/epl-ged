import * as types from './actionTypes';
import status from '../status/status';
import IaBase from './IaBase';
import Point from '../Point';

export default class IaPoint extends IaBase {
    constructor(iaManager) {
        super(iaManager);
    }

    start() {
        this._p = undefined;
    }


    rasterPoint(p) {
        const rasterX = 10;
        const rasterY = 10;
        return new Point( Math.round(p.x / rasterX) * rasterX,
                        Math.round(p.y / rasterY) * rasterY );
    }

    onAction(action) {
        switch (action.type) {
            case types.EventMouseMove:
                this._p = this.rasterPoint( action.event.point );
                status.setText(`x:${this._p.x} y:${this._p.y}`);
                this._iaManager.dispatch({type: types.IaPointUpdate, 
                        data:{point:this._p}});
                break;
            case types.EventLMouseClick:
                this._p = this.rasterPoint( action.event.point );
                this._iaManager.dispatch({type: types.IaPointClick, 
                        data:{point:this._p}});
                break;
            case types.EventKeyPress:
                if (action.keyCode == 27) {
                    // escape
                    this._iaManager.dispatch({type: types.IaPointCancel});
                }
                break;
        }
    }

}