
import IaLine from './IaLine';
import IaPoint from './IaPoint';
import IaRectangle from './IaRectangle';
import IaSymbol from './IaSymbol';
import IaClear from './IaClear';
import status from '../status/status';

class IaManager {

    constructor() {
        this._actionQue = [];
        this._iaMap = {};
        this._iaStack = [];
    }

    getInteractionByName(name) {
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
                
                case "IaSymbol":
                    ia = new IaSymbol(this);
                    break;

                case "IaClear":
                    ia = new IaClear(this);
                    break;
                
                default:
                    throw("ia:"+ name + " not found,");
            }
            if (ia) {
                this._iaMap[name] = ia;
            }
        }
        return ia;
    }

    clearIaStack() {
        // stop all interactions (in reverse order)
        for (let i=this._iaStack.length-1; i>=0; i--) {
            let ia = this._iaStack[i];
            if (ia.stop) {
                ia.stop();
            }
        }
        this._iaStack = [];
    }


    start(name) {
        let ia = this.getInteractionByName(name);
        this._iaStack.push(ia);
        if (ia.start) {
            ia.start();
        }
    }

    dispatch(action) {
        let workOnQue = this._actionQue.length > 0;
        this._actionQue.push(action);
        if (!workOnQue) {
            // dispatch the action to all subscribers
            let iAction = 0;
            while (iAction < this._actionQue.length) {
                let action = this._actionQue[iAction];

                for (let i=this._iaStack.length-1; i>=0; i--) {
                    let ia = this._iaStack[i];
                    if (ia.onAction) {
                        ia.onAction(action);
                    }
                }
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
let iaManager = new IaManager();
export default iaManager;
