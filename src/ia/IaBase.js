    
class IaBase {
    constructor(iaManager, name = "") {
        this._iaManager = iaManager;
        // name can be overwritten, if not equal to the class name
        if (name == "") {
            // default name is the class name
            name = this.constructor.name;
        }
        iaManager.registerInteraction(name, this);
    }

    startInteraction(name) {
        this._iaManager.start(name);
    }

    stopInteraction(name) {
        this._iaManager.stop(name);
    }



}


export default IaBase;

