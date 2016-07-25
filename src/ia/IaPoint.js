
import * as types from './actionTypes';
import status from '../status/status';
import IaBase from './IaBase';

export default class IaPoint extends IaBase {
    constructor(iaManager) {
        super(iaManager);
    }

    start() {
        this._p = undefined;
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
            case types.EventKeyPress:
                if (action.keyCode == 27) {
                    // excape
                    this._iaManager.dispatch({type: types.IaPointCancel});
                }
                break;
        }
    }

}