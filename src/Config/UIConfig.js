// import GameStartController from "../UI/GameStartController";
// import GameStartView from "../UI/GameStartView";

let UIConfig = {}

UIConfig.ViewName = {
    OrchardMainUI: {
        FuiImageUrl: "res/Orchard_atlas0.png",
        FuiBufferUrl: "res/Orchard.json",
        Pkg: "Orchard",
        Com:"OrchardMain",
    },
}

UIConfig.AnimationPath = {

}

//创建Spine或DragonBone动画
//_slot:FairyGui挂点
UIConfig.CreateObjectFromPool = function(_path, _slot) {
    if(_path == null || _slot == null) return

    //从池中创建一个Skeleton对象
    // let skeleton = new Laya.Skeleton();
    let skeleton = Laya.Pool.getItemByClass(_path, Laya.Skeleton);
    //添加到舞台
    // Laya.stage.addChild(skeleton);
    //若池中没有，通过加载直接创建动画
    if(skeleton == null) {
        skeleton.load(_path);
    }

    if(_slot != null) {
        _slot.displayObject.addChild(skeleton);
    }
}

UIConfig.ReturnObjectToPool = function(_path, _object) {
    if(_path == null || _object == null) return
    
    Laya.Pool.recover(_path, _object)
}

// UIConfig.ControllerName = {
//     GameStartController: GameStartController,
// }

export default UIConfig;