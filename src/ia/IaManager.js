
import {IaLine} from './IaLine';
import {IaPoint} from './IaPoint';
import {IaRectangle} from './IaRectangle';
import status from '../status/status';

class IaManager {

    constructor() {
        this._actionQue = [];
        this._subscribers = [];
        this._iaMap = {};
    }

    subscribe(func) {
        this._subscribers.push(func);
    }

    unsubscribe(func) {
        for (let i=0; i<this._subscribers.length; i++) {
            if (this._subscribers[i] == func) {
                this._subscribers.splice(i, 1);
                return;
            }
        }
    }

    register(name, ia) {
        this._iaMap[name] = ia;
    }



    unregister(name, ia) {
        this._iaMap[name] = undefined;
    }


    start(name) {
        let ia = this._iaMap[name];
        if (ia == undefined) {
            // first create the interaction
            switch (name) {
                case "IaLine":
                    ia = new IaLine(this);
                    break;

                case "IaRectangle":
                    ia = new IaRectangle(this);
                    break;

                case "IaPoint":
                    ia = new IaPoint(this); 
                    break;
                
                default:
                    // do nothing
                    return;
            }
            this.register(name, ia);
        }
        ia.start();
    }

    dispatch(action) {
        let workOnQue = this._actionQue.length > 0;
        this._actionQue.push(action);
        if (!workOnQue) {
            // dispatch the action to all subscribers
            let iAction = 0;
            while (iAction < this._actionQue.length) {
                let action = this._actionQue[iAction];
                this._subscribers.forEach(function(subscriber) {
                    subscriber(action);
                });
                iAction++;
            }
            this._actionQue = [];
        }
    }

    showStatus() {
        status.clear();
        
    }

}



// make a singleton
export let iaManager = new IaManager();
