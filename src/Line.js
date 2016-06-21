
export class Line {
    constructor(pt1, pt2) {
        this.p1 = pt1;
        this.p2 = pt2;
    }


    draw(drawCanvas) {
        drawCanvas.drawLine(this);
    }
}