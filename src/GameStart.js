import LocalConfig from "./LocalConfig";
    
export default class GameStart{
    constructor(){
        let _view = fairygui.GComponent;

        this._view = fairygui.UIPackage.createObject("Orchard","OrchardMain").asCom;
        this.btnKettle = this._view.getChild("Button_Kettle");
        this.tree = this._view.getChild("Component_Tree").asCom;
        this.Link = this._view.getChild("Text_Link")
        this.Link.on(laya.events.Event.CLICK,this,this.onClickLink);

        this.luky = {};
        for(let i = 1; i <= 6; i++){
            this.luky[i] = this._view.getChild("b" + i);
        }

        this.cdTime = 10;
        //浇水动效
        this.waterTween = this._view.getTransition("Effect_Water");
        //返回动效
        this.backTween = this._view.getTransition("Effect_Back");
        //树抖动
        this.treeShakeEffect = this.tree.getTransition("Effect_Shake");

        this.btnKettle.on(Laya.Event.CLICK,this,this.waterTree);
    }

    onClickLink(){
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

    //加载界面
    addView() {
        fairygui.GRoot.inst.addChild(this._view);
        this.refreshUI();
    }

    //刷新界面
    refreshUI(){
        let drop = LocalConfig.GetDrops();
        this.Link.text = drop < LocalConfig.Seedling.MaxDrips ? "再浇水"+ (LocalConfig.Seedling.MaxDrips - drop) + "次" + LocalConfig.Seedling.Name + "就长大成树啦！" : "恭喜！" + LocalConfig.Seedling.Name + "已经成熟啦！";
    }

    //开始游戏
    startGame() {
        fairygui.GRoot.inst.removeChildren();
        if(!GameMain.mainPanel){
            GameMain.mainPanel = new MainPanel();
        }
        GameMain.mainPanel.addView();
        GameMain.mainPanel.startGame();
    }

    waterTree(){
        this.btnKettle.touchable = false;
        this.waterTween.play(laya.utils.Handler.create(this, this.onWaterComplete));
    }

    onWaterComplete(){
        this.treeShakeEffect.play(laya.utils.Handler.create(this, this.kettleBack));
    }

    kettleBack(){
        this.backTween.play(laya.utils.Handler.create(this, this.coolDown));
    }

    coolDown(){
        LocalConfig.SaveDrops(LocalConfig.GetDrops() + 1);
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
}