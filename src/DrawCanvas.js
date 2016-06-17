
export class DrawCanvas {
    constructor(width, height) {
        this._bufferCanvas = document.createElement('canvas');
        this._width = width;
        this._height = height;     
        this._bufferCanvas.width = width;
        this._bufferCanvas.height = height;   
        this._bufferCtx = this._bufferCanvas.getContext('2d');

        this._dirty = false;
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