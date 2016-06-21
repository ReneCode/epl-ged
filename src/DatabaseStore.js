
export class DatabaseStore {
    
    constructor(drawCanvas) {
        this._drawCanvas = drawCanvas;
        this._items = [];
    }

    addLine(line) {
        console.log("store Line");
        this._items.push(line);

        console.dir(jQuery.param(line));

        const URL_API = "http://localhost:3010/api/ged";
        $.ajax( {
            type: "POST",
            url: URL_API,
            data: JSON.stringify(line),
            contentType: 'application/json; charset=utf-8'
            }
        )

        this._drawCanvas.drawLine(line);
    }

    drawItems(drawCanvas) {
        this._items.forEach(function(item) {
            item.draw(drawCanvas);
        });
    } 
}