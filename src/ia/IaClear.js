

import databaseStore from '../DatabaseStore';
import IaBase from './IaBase';

export default class IaClear extends IaBase {
    constructor(iaManager) {
        super(iaManager);
    }

    start() {
        databaseStore.deleteAll( function() {
    		databaseStore.commit();
	    });
    }

}


