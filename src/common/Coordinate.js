
import math from 'mathjs';

class Coordinate {
		constructor() {
			this.viewportX1 = 300;
			this.viewportY1 = 500;
			this.viewportX2 = 600;
			this.viewportY2 = 700;

			this.deviceWidth = 600;
			this.deviceHeight = 400;

			this.calcTranslationWcToDc();
		}

		setViewport(x1, y1, x2, y2) {
			this.viewportX1 = x1;
			this.viewportY1 = y1;
			this.viewportX2 = x2;
			this.viewportY2 = y2;

			this.calcTranslationWcToDc();
		}

		setDevice(w, h) {
			this.deviceWidth = w;
			this.deviceHeight = h;
			this.calcTranslationWcToDc();
		}

		calcTranslationWcToDc() {
			// translation
			let viewportWidth = this.viewportX2 - this.viewportX1;
			let viewportHeight = this.viewportY2 - this.viewportY1;
			let transMatrix = math.matrix(
				[ [1,    0,    -this.viewportX1],
				  [0,    1,    -this.viewportY1],
				  [0,    0,    1] ] );
			let scaleX = this.deviceWidth / viewportWidth;
			let scaleY = this.deviceHeight / viewportHeight;
			let scale = math.min(scaleX, scaleY);
			let scaleMatrix = math.matrix(
 				[ [scale,  0,      0],
				  [0,      scale,  0],
				  [0,      0,      1] ]);
			

				console.log("---------" + scale);
//			console.log( transMatrix );
//			console.log( scaleMatrix);

			this.translationMatrix = math.multiply(transMatrix, scaleMatrix);
			console.log( this.translationMatrix);

			this.translationMatrix = scaleMatrix;
			this.translationMatrix = transMatrix;
			
		}	

		worldToDevice(wcP) {
			let vector = math.matrix([wcP.x, wcP.y, 1]);
			let result = math.multiply(this.translationMatrix, vector);
			let res = [];
			result.forEach( (value)  => {
				res.push(value);
			})
			return {x:res[0], y:res[1]};
		}
}

export default Coordinate;

