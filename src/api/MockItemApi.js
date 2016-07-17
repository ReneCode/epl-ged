

const delay = 400;

let itemData = [
    {"item":"line","p1":{"x":224.671875,"y":54},"p2":{"x":237.671875,"y":195}},
    {"item":"line","p1":{"x":266.671875,"y":106},"p2":{"x":287.671875,"y":224}},
    {"item":"line","p1":{"x":318.671875,"y":157},"p2":{"x":338.671875,"y":264}},
    {"item":"line","p1":{"x":378.671875,"y":214},"p2":{"x":404.671875,"y":285}},
    {"item":"rect","x":53.671875,"y":78,"w":115,"h":107},
    {"item":"rect","x":86.671875,"y":100,"w":22,"h":15},
    {"item":"rect","x":122.671875,"y":106,"w":27,"h":13},
    {"item":"rect","x":114.671875,"y":124,"w":5,"h":20},
    {"item":"rect","x":88.671875,"y":158,"w":55,"h":12},
    {"item":"rect","x":397.671875,"y":55,"w":89,"h":110},
    {"item":"line","p1":{"x":397.671875,"y":55},"p2":{"x":486.671875,"y":165}},
    {"item":"rect","x":534.671875,"y":183,"w":-48,"h":56},
    {"item":"line","p1":{"x":534.671875,"y":183},"p2":{"x":486.671875,"y":239}},
    {"item":"rect","x":506.671875,"y":296,"w":36,"h":49},
    {"item":"line","p1":{"x":506.671875,"y":296},"p2":{"x":542.671875,"y":345}},
    {"item":"rect","x":433.671875,"y":325,"w":-71,"h":-31},
    {"item":"line","p1":{"x":433.671875,"y":325},"p2":{"x":362.671875,"y":294}},
    {"item":"line","p1":{"x":117.671875,"y":209},"p2":{"x":83.671875,"y":321}},
    {"item":"rect","x":117.671875,"y":209,"w":-34,"h":112},
    {"item":"line","p1":{"x":216.671875,"y":324},"p2":{"x":108.671875,"y":378}},
    {"item":"rect","x":216.671875,"y":324,"w":-108,"h":54},
    {"item":"line","p1":{"x":245.671875,"y":301},"p2":{"x":136.671875,"y":367}},
    {"item":"rect","x":245.671875,"y":301,"w":-109,"h":66},
    {"item":"line","p1":{"x":110.671875,"y":326},"p2":{"x":33.671875,"y":274}},
    {"item":"line","p1":{"x":110.671875,"y":326},"p2":{"x":33.671875,"y":274}},
    {"item":"rect","x":110.671875,"y":326,"w":-77,"h":-52},
    {"item":"line","p1":{"x":216.671875,"y":380},"p2":{"x":245.671875,"y":364}},
    {"item":"line","p1":{"x":112.671875,"y":326},"p2":{"x":137.671875,"y":304}},
    {"item":"line","p1":{"x":113.671875,"y":376},"p2":{"x":142.671875,"y":367}},
    {"item":"line","p1":{"x":215.671875,"y":326},"p2":{"x":242.671875,"y":304}}
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

