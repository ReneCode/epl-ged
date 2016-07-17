

const selector = ".status";

class Status {
    static clear() {
        $(selector).empty();
    }

    static setText(text) {
        this.clear();
        this.addText(text);
    }

    static addText(text) {
        let newElement = document.createElement("div");
        $(newElement).text(text);
        $(selector).append(newElement);
    }
}

export default Status;
