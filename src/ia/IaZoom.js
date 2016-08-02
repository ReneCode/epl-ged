
import * as types from './actionTypes';
import Rectangle from '../Rectangle.js';
import databaseStore from '../DatabaseStore.js';
import IaBase from './IaBase';
import command from '../Command/Command.js';
import * as commands from '../Command/CommandTypes';

export default class IaZoom extends IaBase {
    constructor(iaManager) {
        super(iaManager);
    }

    start() {
        this._p1 = undefined;
        this.startInteraction("IaPoint");
    }

    createTenporaryRectangle(pt) {
        databaseStore.addItem(new Rectangle(
                this._p1, 
                {   w: pt.x - this._p1.x, 
                    h: pt.y - this._p1.y }), 
                true);
    }



    onAction(action) {
        switch (action.type) {
            case types.IaPointUpdate:
                if (this._p1) {
                    this.createTenporaryRectangle(action.data.point);
                }
                break;
            case types.IaPointClick:
                if (!this._p1) {
                    this._p1 = action.data.point;                   
                }
                else {
					this._iaManager.stop("IaPoint");
                    let w = action.data.point.x - this._p1.x;
                    let h = action.data.point.y - this._p1.y;

                    command.execute(commands.CmdZoom, {x:this._p1, y:this._p1.y,
                                                        w:w, h:h } );
					// stop current interaction and the IaPoint (started by me)
					this._iaManager.stop();
                }
                break;

            case types.IaPointCancel:
				this._iaManager.stop();
                break;
        }
    }


}