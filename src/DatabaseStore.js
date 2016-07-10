
import { Line } from './Line.js';
import { Rectangle } from './Rectangle.js';
import { drawCanvas } from './DrawCanvas';

const URL_API = "http://localhost:3010/api/ged";

class DatabaseStore {
    
    init() {
        this._items = [];
        // temporary items will be deleted after each commit
        // use it for e.g. rubber-band lines
        this._tmpItems = [];
    }

    deleteAll(callback) {
        let ds = this;
        $.ajax({
            url: URL_API,
            method: "DELETE"
        })
        .done(function() {
            ds._items = [];
            drawCanvas.setDirty();
            if (callback) {
                callback();
            }
        });
    }

    load(callback) {
        let ds = this;
        $.ajax({
            url: URL_API,
            method: "GET",
            contentType: 'application/json',      
        })
        .done( function(data) {
            ds._item = [];
            data.forEach(function(d) {
                let o = undefined;
                switch (d.item) {
                    case "line":
                        o = new Line();
                        o.fromJson(d);
                        break;
                    case "rect":
                        o = new Rectangle();
                        o.fromJson(d);
                        break;
                }
                if (o) {
                    ds._items.push( o );
                }
            });
            if (callback)
            {
                // finished loading all items from Server
                callback();
            }
        });
    }

    addItem(item, temporary = false) {
        if (temporary) {
            this._tmpItems.push(item);
        }
        else {        
            this._items.push(item);
        }

        if (!temporary) {
            let ds = this;
            $.ajax({
                url: URL_API,
                method: "POST",
                data: JSON.stringify(item),
                contentType: 'application/json',
            })
            .done( function(data) {
                // may be call some callback
            });
        }
    }


    commit() {
        drawCanvas.clear();
        this._items.forEach(function(item) {
            item.draw(drawCanvas);
        });

        // draw the temporary items just once
        this._tmpItems.forEach(function(item) {
            item.draw(drawCanvas);
        });
        // now they are gone
        this._tmpItems = [];
        
        drawCanvas.show();
    }
}


// make a singleton
export let databaseStore = new DatabaseStore();
