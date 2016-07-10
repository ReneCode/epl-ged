
export class Rectangle {

    constructor(pt, size) {
        this.item = 'rect';
        if (pt  && size) {
            this.x = pt.x;
            this.y = pt.y;
            this.w = size.w;
            this.h = size.h;

        }
    }

    fromJson(obj) {
        if (obj.item == 'rect') {
            this.x = obj.x;
            this.y = obj.y;
            this.w = obj.w;
            this.h = obj.h;
        }
    }

    draw(drawCanvas) {
        drawCanvas.drawRectangle(this);
    }
}

