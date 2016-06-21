
import { Line } from './Line.js'

const URL_API = "http://localhost:3010/api/ged";

class DatabaseStore {
    
    init(drawCanvas) {
        this._drawCanvas = drawCanvas;
        this._items = [];
    }

    load(callback) {
        let ds = this;
        $.ajax({
            url: URL_API,
            method: "GET",
            contentType: 'application/json',      
        })
        .done( function(data) {
            data.forEach(function(d) {
                let o = undefined;
                switch (d.item) {
                    case "line":
                        o = new Line();
                        o.fromJson(d);
                        break;
                }
                if (o) {
                    ds._items.push( o );
                }
            });
            if (callback)
            {
                callback();
            }
        })
    }

    addLine(line) {
        this._items.push(line);

        let ds = this;
        $.ajax({
            url: URL_API,
            method: "POST",
            data: JSON.stringify(line),
            contentType: 'application/json',
        })
        .done( function(data) {
            ds._drawCanvas.drawLine(line);
        });
    }

    drawItems(drawCanvas) {
        this._items.forEach(function(item) {
            item.draw(drawCanvas);
        });
    } 
}

// make a singleton
export let databaseStore = new DatabaseStore();
