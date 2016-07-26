
import * as types from './actionTypes';
import databaseStore from '../DatabaseStore';
import IaBase from './IaBase';
import status from '../status/status';
import Line from '../Line';


const lines = [
    {p1:{x:50,y:50}, p2:{x:-50,y:-50}},
    {p1:{x:50,y:-50}, p2:{x:-50,y:50}},
    {p1:{x:-50,y:50}, p2:{x:50,y:50}}
];

class IaSymbol extends IaBase {
    constructor(iaManager) {
        super(iaManager);
    }

    start() {
        this.startInteraction("IaPoint");
    }

    createSymbol(pt, temporary=false) {
        lines.forEach( l => {
            databaseStore.addItem(
                new Line( pt.add(l.p1), 
                          pt.add(l.p2)),
            temporary);
        });
    }

    onAction(action) {
        switch (action.type) {
            case types.IaPointUpdate:
                this.createSymbol(action.data.point, true);
                break;

            case types.IaPointClick:
                this.createSymbol(action.data.point, false);
                break;
                
        }
    }

}

export default IaSymbol;
