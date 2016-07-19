
export default class Point {
	constructor(cx, cy) {
		this.x = cx;
		this.y = cy;
	}

	add(pt) {
		return new Point(this.x + pt.x, this.y + pt.y);
	}
}

