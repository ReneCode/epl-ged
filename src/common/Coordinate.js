
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
			let viewportHeight = this.viewportX2 - this.viewportX1;
			this.translateX = -this.viewportX1;
			this.translateY = -this.viewportY1;
			let scaleX = this.deviceWidth / viewportWidth;
			let scaleY = this.deviceHeight / viewportHeight;
			this.scale = math.min(scaleX, scaleY);
		}	

		worldToDevice(wcP) {
			return {
				x: (wcP.x + this.translateX) * this.scale,
				y: (wcP.y + this.translateY) * this.scale
			}
		}
}

export default Coordinate;

