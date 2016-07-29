


import iaManager from '../ia/IaManager';

class ConfigMenu {

    doAction(ia) {
        iaManager.clearIaStack();
        iaManager.start(ia);
    }

    setMenu(jsonMenu) {
        if (jsonMenu.length > 0) {
            let domMenu = $("#iamenu");
            domMenu.empty();
            
            jsonMenu.forEach( (m) => {
                let li = $("<li>")
                    .text(m.text);
                li.on('click', () => {
                    this.doAction(m.ia); 
                });                 

                domMenu.append(li);
            });
        }
    }
};

export default ConfigMenu;