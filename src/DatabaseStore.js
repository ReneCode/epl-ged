
export class DatabaseStore {
    
    constructor(drawCanvas) {
        this._drawCanvas = drawCanvas;
        this._items = [];
    }

    addLine(line) {
        console.log("store Line");
        this._items.push(line);
        this._drawCanvas.drawLine(line);
    }

    drawItems(drawCanvas) {
        this._items.forEach(function(item) {
            item.draw(drawCanvas);
        });
    } 
}