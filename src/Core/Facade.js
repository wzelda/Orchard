// import UIImporter from "../Config/UIImporter";

let Facade = {}

Facade.openController = function(_name, _data) {
    if(_name == null || typeof(_name) === 'undefined') return

    _name.create();
    _name.open(_data);
}

export default Facade;