

const delay = 400;

let itemData = [
    {"item":"line","p1":{"x":50,"y":54},"p2":{"x":142,"y":195}},
    {"item":"line","p1":{"x":266,"y":106},"p2":{"x":287,"y":224}},
    {"item":"line","p1":{"x":318,"y":157},"p2":{"x":318,"y":264}},
    {"item":"line","p1":{"x":78,"y":214},"p2":{"x":404,"y":214}}
  
    ];


const createNewItem = (item) => {
    return Object.assign({}, item);
};

class MockItemApi {

    static deleteAllItems() {
        return new Promise( (resolve, reject) => {
            setTimeout( () => {
                itemData = [];
                resolve();
            }, delay);
        });
    }

    static getAllItems() {
        return new Promise( (resolve, reject) => {
            setTimeout( () => {
                resolve(itemData);
            }, delay);
        });

    }

    static saveItem(item) {
        return new Promise( (resolve, reject) => {
            setTimeout( (item) => {
                let newItem = createNewItem(item);
                itemData.push(newItem);
                resolve(itemData);
            });
        });
    }
}

export default MockItemApi;

