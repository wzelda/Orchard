import UIManager from "../Manager/UIManager";
import UIConfig from "../Config/UIConfig";
import LocalConfig from "../LocalConfig";

let view = UIManager.View();

view.LoadView = function() {
    let viewName = UIConfig.ViewName
    this.FuiImageUrl = viewName.OrchardMainUI.FuiImageUrl;
    this.FuiBufferUrl = viewName.OrchardMainUI.FuiBufferUrl;
    this.Pkg = viewName.OrchardMainUI.Pkg;
    this.Com = viewName.OrchardMainUI.Com;
    this.UI = fairygui.UIPackage.createObject(this.Pkg, this.Com).asCom;
    fairygui.GRoot.inst.addChild(this.UI);

    this.btnKettle = this.UI.getChild("Button_Kettle");
    this.tree = this.UI.getChild("Component_Tree").asCom;
    this.Link = this.UI.getChild("Text_Link")
    this.Link.on(laya.events.Event.CLICK,this,this.onClickLink);

    this.luky = {};
    for(let i = 1; i <= 6; i++){
        this.luky[i] = this.UI.getChild("b" + i);
    }

    this.cdTime = 10;
    //浇水动效
    this.waterTween = this.UI.getTransition("Effect_Water");
    //返回动效
    this.backTween = this.UI.getTransition("Effect_Back");
    //树抖动
    this.treeShakeEffect = this.tree.getTransition("Effect_Shake");

    this.btnKettle.on(Laya.Event.CLICK,this,this.waterTree);
}

view.onClickLink = function(){
    // laya.utils.Browser.window.location.href="http://www.bing.com";
    let cdtimer = new Laya.Timer();
    let curtime = cdtimer.currTimer;
    let i = 0;

    let lukygo = function(){
        if(cdtimer.currTimer < 3000 + curtime){
            i++;
            i = i > 6 ? 1 : i;
            this.luky[i].fireClick();
        }else {
            cdtimer.clear(this, lukygo);
            cdtimer.loop(1000, this,
                function(){
                    if(cdtimer.currTimer < this.cdTime * 1000 + curtime){
                        i++;
                        i = i > 6 ? 1 : i;
                        this.luky[i].fireClick(true);
                    }else{
                        cdtimer.clearAll(this);
                        this.btnKettle.touchable = true;
                    }
                }
            )
        }
    }

    cdtimer.loop(200, this, lukygo)
}

//刷新界面
view.refreshUI = function(){
    let drop = LocalConfig.GetDrops();
    this.Link.text = drop < LocalConfig.Seedling.MaxDrips ? 
    "再浇水"+ (LocalConfig.Seedling.MaxDrips - drop) + "次" + LocalConfig.Seedling.Name + "就长大成树啦！" : 
    "恭喜！" + LocalConfig.Seedling.Name + "已经成熟啦！";
}

view.waterTree = function(){
    this.btnKettle.touchable = false;
    this.waterTween.play(laya.utils.Handler.create(this, this.onWaterComplete));
    LocalConfig.SaveDrops(LocalConfig.GetDrops() + 1);
    
    let xhr = new Laya.HttpRequest();
    xhr.http.timeout = 10000;
    xhr.once(Event.COMPLETE,this,this.completeHandler);
    xhr.once(Event.ERROR,this,this.errorHandler);
    xhr.on(Event.PROGRESS,this,this.processHandler);
    xhr.send("http://192.168.1.64:8080","雷猴Go！","get","text");
}

view.processHandler = function(data){
    console.log(data);
}

view.errorHandler = function(data){
}

view.completeHandler = function(e){
}
//浇水完成
view.onWaterComplete = function(){
    this.treeShakeEffect.play(laya.utils.Handler.create(this, this.kettleBack));
}

view.kettleBack = function(){
    this.backTween.play(laya.utils.Handler.create(this, this.coolDown));
}

view.coolDown = function(){
    this.refreshUI();

    let cdtimer = new Laya.Timer();
    let curtime = cdtimer.currTimer;

    let loopcd = function(){
        if(cdtimer.currTimer < this.cdTime * 1000 + curtime){
            this.btnKettle.getController("Cool_C").selectedIndex = 1;
            this.btnKettle.text = Math.ceil((this.cdTime * 1000 + curtime - cdtimer.currTimer) / 1000).toString();
        }else{
            cdtimer.clear(this, loopcd);
            this.btnKettle.touchable = true;
            this.btnKettle.getController("Cool_C").selectedIndex = 0;
        }
    }

    cdtimer.frameLoop(1, this, loopcd);
}


export default view;