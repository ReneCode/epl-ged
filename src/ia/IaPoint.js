
import * as types from './actionTypes';
import status from '../status/status';

export class IaPoint  {
    constructor(iaManager) {
        this._iaManager = iaManager;
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.onAction = this.onAction.bind(this);
    }

    start() {
        this._p = undefined;
        this._iaManager.subscribe(this.onAction);
    }

    stop() {
        this._iaManager.unsubscribe(this.onAction);
    }

    onAction(action) {
        switch (action.type) {
            case types.EventMouseMove:
                this._p = action.event.point;
                this._iaManager.dispatch({type: types.IaPointUpdate, 
                        data:{point:this._p}});
                break;
            case types.EventLMouseClick:
                this._p = action.event.point;
                this._iaManager.dispatch({type: types.IaPointClick, 
                        data:{point:this._p}});
                break;
            case types.EventKeyEscape:
                this._iaManager.dispatch({type: types.IaPointCancel});
                break;
        }
    }

}