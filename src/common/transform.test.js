
import expect from 'expect';
import math from 'mathjs';
import Coordinate from './Coordinate';



describe('coordinate-mathe', function() {
	describe('Matrix testing', () => {
		it('multiply two matrices', () => {
			let a = math.matrix([[1,2,3],[2,3,4],[3,4,5]]);
			let b = math.matrix([3,2,1]);
			let c = math.multiply(a, b);
			let matrixResult = math.subset(c,math.index([0,1,2]));
			let result = [];
			matrixResult.forEach( (value, index, matrix) => {
				result.push(value);
			});
			expect(result[0]).toBe(10);
			expect(result[1]).toBe(16);
			expect(result[2]).toBe(22);
		})
	});

	describe('wc2dc transform', function() {
		it('should translate wc to dc + y-center', function() {
			let transformCoord = new Coordinate();
			transformCoord.setViewport(3000, 3000, 5000, 4000);
			transformCoord.setDevice(500, 400);
			let wcP = {x:3500, y:4000};
			let dcP = transformCoord.worldToDevice(wcP);
			expect(dcP.x).toBe(125);
			expect(dcP.y).toBe(325);
		});

		it('should translate wc to dc + x-center', function() {
			let transformCoord = new Coordinate();
			transformCoord.setViewport(3000, 3000, 5000, 4000);
			transformCoord.setDevice(1000, 400);
			let wcP = {x:3500, y:4000};
			let dcP = transformCoord.worldToDevice(wcP);
			expect(dcP.x).toBe(300);
			expect(dcP.y).toBe(400);
		})

	})	
})
