
class DrawCanvas {
    constructor() {
        this._bufferCanvas = document.createElement('canvas');
        this._bufferCtx = this._bufferCanvas.getContext('2d');
        this._dirty = false;
    }

    init(targetCtx, coordinateTransform) {
        this._targetCtx = targetCtx;
        this._coordinateTransform = coordinateTransform;
    }

    resize(width, height) {
        this._width = width;
        this._height = height;     
        this._bufferCanvas.width = width;
        this._bufferCanvas.height = height;   
    }

    _redraw(targetCtx) {
        if (!this._dirty) {
            return;
        }
        targetCtx.drawImage(this._bufferCanvas, 0, 0);
        this._bufferCtx.fillStyle = '#fff';
        this._bufferCtx.fillRect(0, 0, this._width, this._height);

        this._dirty = false;
    }

    setDirty() {
        this._dirty = true;
    }

    clear() {
        this._bufferCtx.fillStyle = '#fff';
        this._bufferCtx.fillRect(0, 0, this._width, this._height);
        this._dirty = true;
    }

    show() {
        if (this._dirty) {
            this._targetCtx.drawImage(this._bufferCanvas, 0, 0);
            this._dirty = false;  
        }
    }

    drawItems(items) {
        items.forEach( (item) => {
            item.draw(this);
        });
    }


    drawRectangle(rect) {
        let p1 = this._coordinateTransform.worldToDevice(
                    {x:rect.x, y:rect.y});
        let p2 = this._coordinateTransform.worldToDevice(
                    {x:rect.x + rect.w, y:rect.y + rect.h});

        this._bufferCtx.beginPath();
        this._bufferCtx.rect( p1.x, p1.y, 
                            p2.x - p1.x, p2.y - p1.y);
        this._bufferCtx.stroke();

        this.setDirty();
    }


    drawLine(line) {
        let p1 = this._coordinateTransform.worldToDevice(line.p1);
        let p2 = this._coordinateTransform.worldToDevice(line.p2);
        this._bufferCtx.beginPath();
        this._bufferCtx.moveTo( p1.x, p1.y );
        this._bufferCtx.lineTo( p2.x, p2.y );
        this._bufferCtx.stroke();

        this.setDirty();
    }

    drawRubberLine(line) {
        this._bufferCtx.save();
        this._bufferCtx.strokeStyle = "#f00";
        this.drawLine(line);
        this._bufferCtx.restore();
    }
}

// singleton
// let drawCanvas = new DrawCanvas();

export default DrawCanvas;

