

import expect from 'expect';
import IaPoint from './IaPoint';

describe('IaPoint', function() {
	it('rasterPoint', function() {

		let oMock =  {
		registerInteraction() {}
		};

		let iaPoint = new IaPoint(oMock);
		let pt = iaPoint.rasterPoint({x:14, y: 48});
		expect(pt.x).toBe(10);
		expect(pt.y).toBe(50);
	});

	it('registerInteraction IaPoint', function() {

		let oMock =  {

			registerInteraction(name, ia) {
				this.name = name;
				this.ia = ia;
			}
		};

		let iaPoint = new IaPoint(oMock);
		expect(oMock.name).toBe("IaPoint");
		expect(oMock.ia).toBe(iaPoint);
	});
});

