
const URL_API = "http://localhost:3010/api/ged";


class ItemApi {

    static deleteAllItems() {
        return new Promise( (resolve, reject) => {
            $.ajax({
                url: URL_API,
                method: "DELETE"
            })
            .done( () => {
                resolve();
            })
            .fail( () => {
                reject();
            });
        });
    }

    static getAllItems() {
        return new Promise( (resolve, reject) => {
            $.ajax({
                url: URL_API,
                method: "GET",
                contentType: 'application/json',      
            })
            .done( (data) => {
                resolve(data);
            })
            .fail( () => {
                reject(); 
            });
        });

    }

    static saveItem(item) {
        return new Promise( (resolve, reject) => {
            $.ajax({
                url: URL_API,
                method: "POST",
                data: JSON.stringify(item),
                contentType: 'application/json',
            })
            .done( (data)  => {
                resolve(data);
            })
            .fail( () => {
                reject();
            });

        });
    }
}

export default ItemApi;

