import View from "../Core/View";
import Controller from "../Core/Controller";

let UIManager = {}

UIManager.View = function() {
    let view = new View();
    return view;
}

UIManager.Controller = function(_view) {
    if(_view == null) return;

    return new Controller(_view);
}

UIManager.openController = function(_name, _data) {
    if(_name == null) return;

    _name.create();
    _name.open(_data);
}

export default UIManager;