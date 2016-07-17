
//import {iaManager} from './iaManager';

class IaBase {
    constructor(iaManager) {
        this._iaManager = iaManager;
    }

    startInteraction(name) {
        this._iaManager.start(name);
    }

}


export default IaBase;

