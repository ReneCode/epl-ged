
import * as types from './actionTypes';
import databaseStore from '../DatabaseStore';
import graphicDisplay from '../graphic/GraphicDisplay';
import IaBase from './IaBase';
import Rectangle from '../Rectangle';


const WIDTH = 8;

class IaSelect extends IaBase {
    constructor(iaManager) {
        super(iaManager);
    }

    start() {
        this.startInteraction("IaPoint");
    }

    createCrosshair(pt) {
		// to device
		pt = graphicDisplay.transformWorldToDevice(pt);
		// an 40 pixel to each side
		let p1 = { x:pt.x - WIDTH, y:pt.y - WIDTH };
		let p2 = { x:pt.x + WIDTH, y:pt.y + WIDTH };
		// what is that in world-coordinates
		p1 = graphicDisplay.transformDeviceToWorld(p1);
		p2 = graphicDisplay.transformDeviceToWorld(p2);

		databaseStore.addItem(
			new Rectangle( 
                {   x: Math.min(p1.x, p2.x), 
                    y: Math.min(p1.y, p2.y) }, 
                {   w: Math.abs(p2.x - p1.x), 
                    h: Math.abs(p2.y - p1.y) })
		, true);
    }

    onAction(action) {
        switch (action.type) {
            case types.IaPointUpdate:
                this.createCrosshair(action.data.point);			
                break;

            case types.IaPointClick:
			// pick item
                break;
                
        }
    }

}

export default IaSelect;
