import UIConfig from "../Config/UIConfig";
import UIManager from "../Manager/UIManager";
import GameStartView from "../UI/GameStartView";
import Controller from "../Core/Controller";

let ctrl = UIManager.Controller(GameStartView);

ctrl.onOpen = function(_data) {
    this.view.refreshUI();
}

export default ctrl;

// export default class GameStartController extends Controller{
//     constructor(){
//         super(GameStartView);
//     }

//     onOpen(){
//         this.view.refreshUI();
//     }
// }