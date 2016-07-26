

import expect from 'expect';
import IaPoint from './IaPoint';

describe('IaPoint', function() {
	it('rasterPoint', function() {
		let iaPoint = new IaPoint(undefined);
		let pt = iaPoint.rasterPoint({x:14, y: 48});
		expect(pt.x).toBe(10);
		expect(pt.y).toBe(50);
	})
})