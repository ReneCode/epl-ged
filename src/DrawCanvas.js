
class DrawCanvas {
    constructor() {
        this._bufferCanvas = document.createElement('canvas');
        this._bufferCtx = this._bufferCanvas.getContext('2d');
        this._dirty = false;
    }

    init(targetCtx) {
        this._targetCtx = targetCtx;
    }

    resize(width, height) {
        this._width = width;
        this._height = height;     
        this._bufferCanvas.width = width;
        this._bufferCanvas.height = height;   
    }

    redraw(targetCtx) {
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


    drawRectangle(rect) {
        this._bufferCtx.beginPath();
        this._bufferCtx.rect( rect.x, rect.y, rect.w, rect.h);
        this._bufferCtx.stroke();

        this.setDirty();
    }


    drawLine(line) {
        this._bufferCtx.beginPath();
        this._bufferCtx.moveTo( line.p1.x, line.p1.y );
        this._bufferCtx.lineTo( line.p2.x, line.p2.y );
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
let drawCanvas = new DrawCanvas()

export default drawCanvas;

