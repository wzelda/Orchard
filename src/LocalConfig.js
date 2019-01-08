var LocalConfig = {}

LocalConfig.OrchardMainUI = {
    FuiImageUrl: "res/Orchard_atlas0.png",
    FuiBufferUrl: "res/Orchard.fui",
}

LocalConfig.Seedling = {
    Name:"香橙树",
    MaxDrips:80
}

LocalConfig.GetDrops = function(){
    let drop = Laya.LocalStorage.getJSON("Drops");
    parseInt(JSON.stringify(drop));
    return drop == null ? 0 : drop;
}

LocalConfig.SaveDrops = function(_value){
    Laya.LocalStorage.setJSON("Drops", _value)
}

LocalConfig.Gamestart = "./GameStart";

export default LocalConfig;