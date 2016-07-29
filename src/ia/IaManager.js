

import status from '../status/status';

class IaManager {

    constructor() {
        this._actionQue = [];
        this._iaMap = {};
        this._iaStack = [];
    }

    registerInteraction(name, ia) {
        console.log(`registerInteraction:${name}`);
        let tmp = this._iaMap[name];
        if (tmp) {
            // can't register twice
            assert(false);
            return;
        }
        this._iaMap[name] = ia;
    }


    getInteractionByName(name) {
        let ia = this._iaMap[name];
        if (ia == undefined) {
            throw("ia:"+ name + " not found,");
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
