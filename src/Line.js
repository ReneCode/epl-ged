
export class Line {

    constructor(pt1, pt2) {
        this.item = 'line';
        this.p1 = pt1;
        this.p2 = pt2;
    }

    fromJson(obj) {
        if (obj.item == 'line') {
            this.p1 = obj.p1;
            this.p2 = obj.p2;
        }
    }

    draw(drawCanvas) {
        drawCanvas.drawLine(this);
    }
}