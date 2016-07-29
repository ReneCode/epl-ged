

import databaseStore from '../DatabaseStore';
import IaBase from './IaBase';

export default class IaClear extends IaBase {
    constructor(iaManager) {
        super(iaManager);
    }

    start() {
        let that = this;
        databaseStore.deleteAll( function() {
    		databaseStore.commit();
            // stop myself
            that.stopInteraction("IaClear");

	    });
    }

}


