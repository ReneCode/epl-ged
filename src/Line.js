
export class Line {
    constructor(p1, p2) {
        this._p1 = p1;
        this._p2 = p2;
    }

    get p1() {
        return this._p1;
    }

    get p2() {
        return this._p2;
    }

    draw(drawCanvas) {
        drawCanvas.drawLine(this);
    }
}