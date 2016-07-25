
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
			this.translationMatrix = math.multiply(scaleMatrix, transMatrix);


			// if scaling x and y are not the same than the min scale is taken
			// to get sure the viewport completely fits into device.
			if (scaleY > scaleX) {
				// shift y to get viewport centered 
				let shiftY = (this.deviceHeight - viewportHeight * scale) / 2;
				let shiftYMatrix = math.matrix(
					[ [1,  0, 0     ],
					  [0,  1, shiftY],
					  [0,  0, 1] ] );
				this.translationMatrix = math.multiply(shiftYMatrix, this.translationMatrix);
			}
			else if (scaleX > scaleY) {
				// shift x to get viewport centered
				let shiftX = (this.deviceWidth - viewportWidth * scale) / 2;
				let shiftXMatrix = math.matrix(
					[ [1,  0,  shiftX],
					  [0,  1,  0],
					  [0,  0,  1] ]	);
				this.translationMatrix = math.multiply(shiftXMatrix, this.translationMatrix);
			} 


			// 0/0  on device is top-left   y = deviceHeight - y
			// first y => -y
			// second y = y + deviceHeight
			let yInverseMatrix = math.matrix(
				[ [1,  0,  0],
				  [0,  -1, 0],
				  [0,  0,  1] ] );
			this.translationMatrix = math.multiply(yInverseMatrix, this.translationMatrix);

			let yAddMatrix = math.matrix(
				[ [1, 0, 0], 
				  [0, 1, this.deviceHeight],
				  [0, 0, 1] ]);
			this.translationMatrix = math.multiply(yAddMatrix, this.translationMatrix);
			
			this.translationDcToWc = math.inv( this.translationMatrix );
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

		deviceToWorld(dcP) {
			let vector = math.matrix([dcP.x, dcP.y, 1]);
			let result = math.multiply(this.translationDcToWc, vector);
			let res = [];
			result.forEach( (value)  => {
				res.push(value);
			})
			return {x:res[0], y:res[1]};
		}
}

export default Coordinate;

