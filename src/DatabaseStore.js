
import Line from './Line.js';
import Rectangle from './Rectangle.js';
import drawCanvas from './DrawCanvas';
import itemApi from './api/MockItemApi';

class DatabaseStore {
    
    init() {
        this._items = [];
        // temporary items will be deleted after each commit
        // use it for e.g. rubber-band lines
        this._tmpItems = [];
        this._dirty = false;
    }

    deleteAll(callback) {
        this._dirty = true;
        let ds = this;
        itemApi.deleteAllItems()
        .then( () => {
            ds._items = [];
            drawCanvas.setDirty();
            if (callback) {
                callback();
            }
        })
        .catch( (error) => {
            throw(error);
        });
    }

    load(callback) {
        this._dirty = true;
        let ds = this;
        itemApi.getAllItems()
        .then( function(data) {
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
        this._dirty = true;
        if (temporary) {
            this._tmpItems.push(item);
        }
        else {        
            this._items.push(item);
        }

        if (!temporary) {
            itemApi.saveItem(item)
            .then( function(data) {
                // may be call some callback
            });
        }
    }


    commit() {
        if (!this._dirty) {
            return;
        }
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
let databaseStore = new DatabaseStore();
export default databaseStore;

