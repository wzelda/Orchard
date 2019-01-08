var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// import GameStartController from "../UI/GameStartController";
// import GameStartView from "../UI/GameStartView";

var UIConfig = {};

UIConfig.ViewName = {
    OrchardMainUI: {
        FuiImageUrl: "res/Orchard_atlas0.png",
        FuiBufferUrl: "res/Orchard.json",
        Pkg: "Orchard",
        Com: "OrchardMain"
    }
};

UIConfig.AnimationPath = {};

//创建Spine或DragonBone动画
//_slot:FairyGui挂点
UIConfig.CreateObjectFromPool = function (_path, _slot) {
    if (_path == null || _slot == null) return;

    //从池中创建一个Skeleton对象
    // let skeleton = new Laya.Skeleton();
    var skeleton = Laya.Pool.getItemByClass(_path, Laya.Skeleton);
    //添加到舞台
    // Laya.stage.addChild(skeleton);
    //若池中没有，通过加载直接创建动画
    if (skeleton == null) {
        skeleton.load(_path);
    }

    if (_slot != null) {
        _slot.displayObject.addChild(skeleton);
    }
};

UIConfig.ReturnObjectToPool = function (_path, _object) {
    if (_path == null || _object == null) return;

    Laya.Pool.recover(_path, _object);
};

// UIConfig.ControllerName = {
//     GameStartController: GameStartController,
// }

exports.default = UIConfig;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller(_view) {
        _classCallCheck(this, Controller);

        if (null == _view) return;

        this.view = _view;
        this.Data = null;
        this.IsOpen = false;
        this.IsDestroyed = true;
    }

    _createClass(Controller, [{
        key: "create",
        value: function create() {
            this.IsDestroyed = false;
            this.onCreate();
            this.view.LoadView();
        }
    }, {
        key: "open",
        value: function open(_data) {
            this.IsOpen = true;
            this.Data = _data;
            this.openOver();
        }
    }, {
        key: "openOver",
        value: function openOver() {
            this.onOpen(this.Data);
        }
    }, {
        key: "close",
        value: function close() {
            if (this.IsOpen == false) return;

            this.IsOpen = false;
            this.onClose();

            if (this.IsDestroyed == false) {
                this.IsDestroyed = true;

                if (this.view != null && this.view.destroy != null) {
                    this.view.destroy();
                    this.view = null;
                }
            }
        }
    }, {
        key: "onClose",
        value: function onClose() {}
    }, {
        key: "onCreate",
        value: function onCreate() {}
    }, {
        key: "onOpen",
        value: function onOpen(_data) {}
    }]);

    return Controller;
}();

exports.default = Controller;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
    function View() {
        _classCallCheck(this, View);

        this.FuiImageUrl = null;
        this.FuiBufferUrl = null;
        this.Pkg = null;
        this.Com = null;
        this.UI = null;
    }

    _createClass(View, [{
        key: "destroy",
        value: function destroy() {
            this.onDistroy();

            if (this.UI != null) {
                fairygui.GRoot.inst.removeChild(this.UI);
            }

            for (var i in this) {
                // 删除UI对象
                if (_typeof(this[i]) == "object" && this[i].Dispose != null) {
                    this[i].Dispose();
                }
            }
        }
    }, {
        key: "onDistroy",
        value: function onDistroy() {}
    }, {
        key: "LoadView",
        value: function LoadView() {}
    }]);

    return View;
}();

exports.default = View;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**This class is automatically generated by LayaAirIDE, please do not make any modifications. */


var _LocalConfig = require("./LocalConfig");

var _LocalConfig2 = _interopRequireDefault(_LocalConfig);

var _GameStart = require("./GameStart");

var _GameStart2 = _interopRequireDefault(_GameStart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameConfig = function () {
    function GameConfig() {
        _classCallCheck(this, GameConfig);
    }

    _createClass(GameConfig, null, [{
        key: "init",
        value: function init() {
            //注册Script或者Runtime引用
            var reg = Laya.ClassUtils.regClass;
        }
    }]);

    return GameConfig;
}();

exports.default = GameConfig;

GameConfig.width = 450;
GameConfig.height = 800;
GameConfig.scaleMode = "showall";
GameConfig.screenMode = "horizontal";
GameConfig.alignV = "center";
GameConfig.alignH = "center";
GameConfig.startScene = "";
GameConfig.sceneRoot = "";
GameConfig.debug = false;
GameConfig.stat = false;
GameConfig.physicsDebug = false;
GameConfig.exportSceneToJson = true;

GameConfig.init();

},{"./GameStart":5,"./LocalConfig":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LocalConfig = require("./LocalConfig");

var _LocalConfig2 = _interopRequireDefault(_LocalConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameStart = function () {
    function GameStart() {
        _classCallCheck(this, GameStart);

        var _view = fairygui.GComponent;

        this._view = fairygui.UIPackage.createObject("Orchard", "OrchardMain").asCom;
        this.btnKettle = this._view.getChild("Button_Kettle");
        this.tree = this._view.getChild("Component_Tree").asCom;
        this.Link = this._view.getChild("Text_Link");
        this.Link.on(laya.events.Event.CLICK, this, this.onClickLink);

        this.luky = {};
        for (var i = 1; i <= 6; i++) {
            this.luky[i] = this._view.getChild("b" + i);
        }

        this.cdTime = 10;
        //浇水动效
        this.waterTween = this._view.getTransition("Effect_Water");
        //返回动效
        this.backTween = this._view.getTransition("Effect_Back");
        //树抖动
        this.treeShakeEffect = this.tree.getTransition("Effect_Shake");

        this.btnKettle.on(Laya.Event.CLICK, this, this.waterTree);
    }

    _createClass(GameStart, [{
        key: "onClickLink",
        value: function onClickLink() {
            // laya.utils.Browser.window.location.href="http://www.bing.com";
            var cdtimer = new Laya.Timer();
            var curtime = cdtimer.currTimer;
            var i = 0;

            var lukygo = function lukygo() {
                if (cdtimer.currTimer < 3000 + curtime) {
                    i++;
                    i = i > 6 ? 1 : i;
                    this.luky[i].fireClick();
                } else {
                    cdtimer.clear(this, lukygo);
                    cdtimer.loop(1000, this, function () {
                        if (cdtimer.currTimer < this.cdTime * 1000 + curtime) {
                            i++;
                            i = i > 6 ? 1 : i;
                            this.luky[i].fireClick(true);
                        } else {
                            cdtimer.clearAll(this);
                            this.btnKettle.touchable = true;
                        }
                    });
                }
            };

            cdtimer.loop(200, this, lukygo);
        }

        //加载界面

    }, {
        key: "addView",
        value: function addView() {
            fairygui.GRoot.inst.addChild(this._view);
            this.refreshUI();
        }

        //刷新界面

    }, {
        key: "refreshUI",
        value: function refreshUI() {
            var drop = _LocalConfig2.default.GetDrops();
            this.Link.text = drop < _LocalConfig2.default.Seedling.MaxDrips ? "再浇水" + (_LocalConfig2.default.Seedling.MaxDrips - drop) + "次" + _LocalConfig2.default.Seedling.Name + "就长大成树啦！" : "恭喜！" + _LocalConfig2.default.Seedling.Name + "已经成熟啦！";
        }

        //开始游戏

    }, {
        key: "startGame",
        value: function startGame() {
            fairygui.GRoot.inst.removeChildren();
            if (!GameMain.mainPanel) {
                GameMain.mainPanel = new MainPanel();
            }
            GameMain.mainPanel.addView();
            GameMain.mainPanel.startGame();
        }
    }, {
        key: "waterTree",
        value: function waterTree() {
            this.btnKettle.touchable = false;
            this.waterTween.play(laya.utils.Handler.create(this, this.onWaterComplete));
        }
    }, {
        key: "onWaterComplete",
        value: function onWaterComplete() {
            this.treeShakeEffect.play(laya.utils.Handler.create(this, this.kettleBack));
        }
    }, {
        key: "kettleBack",
        value: function kettleBack() {
            this.backTween.play(laya.utils.Handler.create(this, this.coolDown));
        }
    }, {
        key: "coolDown",
        value: function coolDown() {
            _LocalConfig2.default.SaveDrops(_LocalConfig2.default.GetDrops() + 1);
            this.refreshUI();

            var cdtimer = new Laya.Timer();
            var curtime = cdtimer.currTimer;

            var loopcd = function loopcd() {
                if (cdtimer.currTimer < this.cdTime * 1000 + curtime) {
                    this.btnKettle.getController("Cool_C").selectedIndex = 1;
                    this.btnKettle.text = Math.ceil((this.cdTime * 1000 + curtime - cdtimer.currTimer) / 1000).toString();
                } else {
                    cdtimer.clear(this, loopcd);
                    this.btnKettle.touchable = true;
                    this.btnKettle.getController("Cool_C").selectedIndex = 0;
                }
            };

            cdtimer.frameLoop(1, this, loopcd);
        }
    }]);

    return GameStart;
}();

exports.default = GameStart;

},{"./LocalConfig":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var LocalConfig = {};

LocalConfig.OrchardMainUI = {
    FuiImageUrl: "res/Orchard_atlas0.png",
    FuiBufferUrl: "res/Orchard.fui"
};

LocalConfig.Seedling = {
    Name: "香橙树",
    MaxDrips: 80
};

LocalConfig.GetDrops = function () {
    var drop = Laya.LocalStorage.getJSON("Drops");
    parseInt(JSON.stringify(drop));
    return drop == null ? 0 : drop;
};

LocalConfig.SaveDrops = function (_value) {
    Laya.LocalStorage.setJSON("Drops", _value);
};

LocalConfig.Gamestart = "./GameStart";

exports.default = LocalConfig;

},{}],7:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameConfig = require("./GameConfig");

var _GameConfig2 = _interopRequireDefault(_GameConfig);

var _UIConfig = require("./Config/UIConfig");

var _UIConfig2 = _interopRequireDefault(_UIConfig);

var _UIManager = require("./Manager/UIManager");

var _UIManager2 = _interopRequireDefault(_UIManager);

var _GameStartController = require("./UI/GameStartController");

var _GameStartController2 = _interopRequireDefault(_GameStartController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
	function Main() {
		_classCallCheck(this, Main);

		fairygui.UIConfig.packageFileExtension = "json";
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(_GameConfig2.default.width, _GameConfig2.default.height);else Laya.init(_GameConfig2.default.width, _GameConfig2.default.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = _GameConfig2.default.scaleMode;
		Laya.stage.screenMode = _GameConfig2.default.screenMode;
		Laya.stage.alignV = _GameConfig2.default.alignV;
		Laya.stage.alignH = _GameConfig2.default.alignH;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = _GameConfig2.default.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (_GameConfig2.default.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (_GameConfig2.default.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (_GameConfig2.default.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	_createClass(Main, [{
		key: "onVersionLoaded",
		value: function onVersionLoaded() {
			//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
			Laya.AtlasInfoManager.enable("fileconfig.json");

			var viewName = _UIConfig2.default.ViewName;
			Laya.loader.load([{ url: viewName.OrchardMainUI.FuiImageUrl, type: laya.net.Loader.IMAGE }, { url: viewName.OrchardMainUI.FuiBufferUrl, type: laya.net.Loader.BUFFER }], laya.utils.Handler.create(this, this.onConfigLoaded));
			// Laya.URL.basePath = "http://192.168.1.64:8080/Orchard/";
		}
	}, {
		key: "onConfigLoaded",
		value: function onConfigLoaded() {
			//加载IDE指定的场景
			// GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);

			Laya.stage.addChild(fairygui.GRoot.inst.displayObject);

			fairygui.UIPackage.addPackage("res/Orchard");

			_UIManager2.default.openController(_GameStartController2.default);
			// UIManager.openController(new GameStartController());
		}
	}]);

	return Main;
}();
//激活启动类


new Main();

},{"./Config/UIConfig":1,"./GameConfig":4,"./Manager/UIManager":8,"./UI/GameStartController":9}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _View = require("../Core/View");

var _View2 = _interopRequireDefault(_View);

var _Controller = require("../Core/Controller");

var _Controller2 = _interopRequireDefault(_Controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UIManager = {};

UIManager.View = function () {
    var view = new _View2.default();
    return view;
};

UIManager.Controller = function (_view) {
    if (_view == null) return;

    return new _Controller2.default(_view);
};

UIManager.openController = function (_name, _data) {
    if (_name == null) return;

    _name.create();
    _name.open(_data);
};

exports.default = UIManager;

},{"../Core/Controller":2,"../Core/View":3}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _UIConfig = require("../Config/UIConfig");

var _UIConfig2 = _interopRequireDefault(_UIConfig);

var _UIManager = require("../Manager/UIManager");

var _UIManager2 = _interopRequireDefault(_UIManager);

var _GameStartView = require("../UI/GameStartView");

var _GameStartView2 = _interopRequireDefault(_GameStartView);

var _Controller = require("../Core/Controller");

var _Controller2 = _interopRequireDefault(_Controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ctrl = _UIManager2.default.Controller(_GameStartView2.default);

ctrl.onOpen = function (_data) {
    this.view.refreshUI();
};

exports.default = ctrl;

// export default class GameStartController extends Controller{
//     constructor(){
//         super(GameStartView);
//     }

//     onOpen(){
//         this.view.refreshUI();
//     }
// }

},{"../Config/UIConfig":1,"../Core/Controller":2,"../Manager/UIManager":8,"../UI/GameStartView":10}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _UIManager = require("../Manager/UIManager");

var _UIManager2 = _interopRequireDefault(_UIManager);

var _UIConfig = require("../Config/UIConfig");

var _UIConfig2 = _interopRequireDefault(_UIConfig);

var _LocalConfig = require("../LocalConfig");

var _LocalConfig2 = _interopRequireDefault(_LocalConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var view = _UIManager2.default.View();

view.LoadView = function () {
    var viewName = _UIConfig2.default.ViewName;
    this.FuiImageUrl = viewName.OrchardMainUI.FuiImageUrl;
    this.FuiBufferUrl = viewName.OrchardMainUI.FuiBufferUrl;
    this.Pkg = viewName.OrchardMainUI.Pkg;
    this.Com = viewName.OrchardMainUI.Com;
    this.UI = fairygui.UIPackage.createObject(this.Pkg, this.Com).asCom;
    fairygui.GRoot.inst.addChild(this.UI);

    this.btnKettle = this.UI.getChild("Button_Kettle");
    this.tree = this.UI.getChild("Component_Tree").asCom;
    this.Link = this.UI.getChild("Text_Link");
    this.Link.on(laya.events.Event.CLICK, this, this.onClickLink);

    this.luky = {};
    for (var i = 1; i <= 6; i++) {
        this.luky[i] = this.UI.getChild("b" + i);
    }

    this.cdTime = 10;
    //浇水动效
    this.waterTween = this.UI.getTransition("Effect_Water");
    //返回动效
    this.backTween = this.UI.getTransition("Effect_Back");
    //树抖动
    this.treeShakeEffect = this.tree.getTransition("Effect_Shake");

    this.btnKettle.on(Laya.Event.CLICK, this, this.waterTree);
};

view.onClickLink = function () {
    // laya.utils.Browser.window.location.href="http://www.bing.com";
    var cdtimer = new Laya.Timer();
    var curtime = cdtimer.currTimer;
    var i = 0;

    var lukygo = function lukygo() {
        if (cdtimer.currTimer < 3000 + curtime) {
            i++;
            i = i > 6 ? 1 : i;
            this.luky[i].fireClick();
        } else {
            cdtimer.clear(this, lukygo);
            cdtimer.loop(1000, this, function () {
                if (cdtimer.currTimer < this.cdTime * 1000 + curtime) {
                    i++;
                    i = i > 6 ? 1 : i;
                    this.luky[i].fireClick(true);
                } else {
                    cdtimer.clearAll(this);
                    this.btnKettle.touchable = true;
                }
            });
        }
    };

    cdtimer.loop(200, this, lukygo);
};

//刷新界面
view.refreshUI = function () {
    var drop = _LocalConfig2.default.GetDrops();
    this.Link.text = drop < _LocalConfig2.default.Seedling.MaxDrips ? "再浇水" + (_LocalConfig2.default.Seedling.MaxDrips - drop) + "次" + _LocalConfig2.default.Seedling.Name + "就长大成树啦！" : "恭喜！" + _LocalConfig2.default.Seedling.Name + "已经成熟啦！";
};

view.waterTree = function () {
    this.btnKettle.touchable = false;
    this.waterTween.play(laya.utils.Handler.create(this, this.onWaterComplete));
    _LocalConfig2.default.SaveDrops(_LocalConfig2.default.GetDrops() + 1);

    var xhr = new Laya.HttpRequest();
    xhr.http.timeout = 10000;
    xhr.once(Event.COMPLETE, this, this.completeHandler);
    xhr.once(Event.ERROR, this, this.errorHandler);
    xhr.on(Event.PROGRESS, this, this.processHandler);
    xhr.send("http://192.168.1.64:8080", "雷猴Go！", "get", "text");
};

view.processHandler = function (data) {
    console.log(data);
};

view.errorHandler = function (data) {};

view.completeHandler = function (e) {};
//浇水完成
view.onWaterComplete = function () {
    this.treeShakeEffect.play(laya.utils.Handler.create(this, this.kettleBack));
};

view.kettleBack = function () {
    this.backTween.play(laya.utils.Handler.create(this, this.coolDown));
};

view.coolDown = function () {
    this.refreshUI();

    var cdtimer = new Laya.Timer();
    var curtime = cdtimer.currTimer;

    var loopcd = function loopcd() {
        if (cdtimer.currTimer < this.cdTime * 1000 + curtime) {
            this.btnKettle.getController("Cool_C").selectedIndex = 1;
            this.btnKettle.text = Math.ceil((this.cdTime * 1000 + curtime - cdtimer.currTimer) / 1000).toString();
        } else {
            cdtimer.clear(this, loopcd);
            this.btnKettle.touchable = true;
            this.btnKettle.getController("Cool_C").selectedIndex = 0;
        }
    };

    cdtimer.frameLoop(1, this, loopcd);
};

exports.default = view;

},{"../Config/UIConfig":1,"../LocalConfig":6,"../Manager/UIManager":8}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0FwcHMvTGF5YUFpcklERS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ29uZmlnL1VJQ29uZmlnLmpzIiwic3JjL0NvcmUvQ29udHJvbGxlci5qcyIsInNyYy9Db3JlL1ZpZXcuanMiLCJzcmMvR2FtZUNvbmZpZy5qcyIsInNyYy9HYW1lU3RhcnQuanMiLCJzcmMvTG9jYWxDb25maWcuanMiLCJzcmMvTWFpbi5qcyIsInNyYy9NYW5hZ2VyL1VJTWFuYWdlci5qcyIsInNyYy9VSS9HYW1lU3RhcnRDb250cm9sbGVyLmpzIiwic3JjL1VJL0dhbWVTdGFydFZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDVkE7QUFDQTs7QUFFQSxJQUFJLFdBQVcsRUFBZjs7QUFFQSxTQUFTLFFBQVQsR0FBb0I7QUFDaEIsbUJBQWU7QUFDWCxxQkFBYSx3QkFERjtBQUVYLHNCQUFjLGtCQUZIO0FBR1gsYUFBSyxTQUhNO0FBSVgsYUFBSTtBQUpPO0FBREMsQ0FBcEI7O0FBU0EsU0FBUyxhQUFULEdBQXlCLEVBQXpCOztBQUlBO0FBQ0E7QUFDQSxTQUFTLG9CQUFULEdBQWdDLFVBQVMsS0FBVCxFQUFnQixLQUFoQixFQUF1QjtBQUNuRCxRQUFHLFNBQVMsSUFBVCxJQUFpQixTQUFTLElBQTdCLEVBQW1DOztBQUVuQztBQUNBO0FBQ0EsUUFBSSxXQUFXLEtBQUssSUFBTCxDQUFVLGNBQVYsQ0FBeUIsS0FBekIsRUFBZ0MsS0FBSyxRQUFyQyxDQUFmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBRyxZQUFZLElBQWYsRUFBcUI7QUFDakIsaUJBQVMsSUFBVCxDQUFjLEtBQWQ7QUFDSDs7QUFFRCxRQUFHLFNBQVMsSUFBWixFQUFrQjtBQUNkLGNBQU0sYUFBTixDQUFvQixRQUFwQixDQUE2QixRQUE3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MEIsSUFBMUIsRUFBZ0MsS0FBSyxRQUFyQyxDQUFwQjtBQUNILENBRkQ7O0FBSUEsS0FBSyxRQUFMLEdBQWdCLFlBQVU7QUFDdEIsU0FBSyxTQUFMOztBQUVBLFFBQUksVUFBVSxJQUFJLEtBQUssS0FBVCxFQUFkO0FBQ0EsUUFBSSxVQUFVLFFBQVEsU0FBdEI7O0FBRUEsUUFBSSxTQUFTLFNBQVQsTUFBUyxHQUFVO0FBQ25CLFlBQUcsUUFBUSxTQUFSLEdBQW9CLEtBQUssTUFBTCxHQUFjLElBQWQsR0FBcUIsT0FBNUMsRUFBb0Q7QUFDaEQsaUJBQUssU0FBTCxDQUFlLGFBQWYsQ0FBNkIsUUFBN0IsRUFBdUMsYUFBdkMsR0FBdUQsQ0FBdkQ7QUFDQSxpQkFBSyxTQUFMLENBQWUsSUFBZixHQUFzQixLQUFLLElBQUwsQ0FBVSxDQUFDLEtBQUssTUFBTCxHQUFjLElBQWQsR0FBcUIsT0FBckIsR0FBK0IsUUFBUSxTQUF4QyxJQUFxRCxJQUEvRCxFQUFxRSxRQUFyRSxFQUF0QjtBQUNILFNBSEQsTUFHSztBQUNELG9CQUFRLEtBQVIsQ0FBYyxJQUFkLEVBQW9CLE1BQXBCO0FBQ0EsaUJBQUssU0FBTCxDQUFlLFNBQWYsR0FBMkIsSUFBM0I7QUFDQSxpQkFBSyxTQUFMLENBQWUsYUFBZixDQUE2QixRQUE3QixFQUF1QyxhQUF2QyxHQUF1RCxDQUF2RDtBQUNIO0FBQ0osS0FURDs7QUFXQSxZQUFRLFNBQVIsQ0FBa0IsQ0FBbEIsRUFBcUIsSUFBckIsRUFBMkIsTUFBM0I7QUFDSCxDQWxCRDs7a0JBcUJlLEkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gaW1wb3J0IEdhbWVTdGFydENvbnRyb2xsZXIgZnJvbSBcIi4uL1VJL0dhbWVTdGFydENvbnRyb2xsZXJcIjtcclxuLy8gaW1wb3J0IEdhbWVTdGFydFZpZXcgZnJvbSBcIi4uL1VJL0dhbWVTdGFydFZpZXdcIjtcclxuXHJcbmxldCBVSUNvbmZpZyA9IHt9XHJcblxyXG5VSUNvbmZpZy5WaWV3TmFtZSA9IHtcclxuICAgIE9yY2hhcmRNYWluVUk6IHtcclxuICAgICAgICBGdWlJbWFnZVVybDogXCJyZXMvT3JjaGFyZF9hdGxhczAucG5nXCIsXHJcbiAgICAgICAgRnVpQnVmZmVyVXJsOiBcInJlcy9PcmNoYXJkLmpzb25cIixcclxuICAgICAgICBQa2c6IFwiT3JjaGFyZFwiLFxyXG4gICAgICAgIENvbTpcIk9yY2hhcmRNYWluXCIsXHJcbiAgICB9LFxyXG59XHJcblxyXG5VSUNvbmZpZy5BbmltYXRpb25QYXRoID0ge1xyXG5cclxufVxyXG5cclxuLy/liJvlu7pTcGluZeaIlkRyYWdvbkJvbmXliqjnlLtcclxuLy9fc2xvdDpGYWlyeUd1aeaMgueCuVxyXG5VSUNvbmZpZy5DcmVhdGVPYmplY3RGcm9tUG9vbCA9IGZ1bmN0aW9uKF9wYXRoLCBfc2xvdCkge1xyXG4gICAgaWYoX3BhdGggPT0gbnVsbCB8fCBfc2xvdCA9PSBudWxsKSByZXR1cm5cclxuXHJcbiAgICAvL+S7juaxoOS4reWIm+W7uuS4gOS4qlNrZWxldG9u5a+56LGhXHJcbiAgICAvLyBsZXQgc2tlbGV0b24gPSBuZXcgTGF5YS5Ta2VsZXRvbigpO1xyXG4gICAgbGV0IHNrZWxldG9uID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKF9wYXRoLCBMYXlhLlNrZWxldG9uKTtcclxuICAgIC8v5re75Yqg5Yiw6Iie5Y+wXHJcbiAgICAvLyBMYXlhLnN0YWdlLmFkZENoaWxkKHNrZWxldG9uKTtcclxuICAgIC8v6Iul5rGg5Lit5rKh5pyJ77yM6YCa6L+H5Yqg6L2955u05o6l5Yib5bu65Yqo55S7XHJcbiAgICBpZihza2VsZXRvbiA9PSBudWxsKSB7XHJcbiAgICAgICAgc2tlbGV0b24ubG9hZChfcGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoX3Nsb3QgIT0gbnVsbCkge1xyXG4gICAgICAgIF9zbG90LmRpc3BsYXlPYmplY3QuYWRkQ2hpbGQoc2tlbGV0b24pO1xyXG4gICAgfVxyXG59XHJcblxyXG5VSUNvbmZpZy5SZXR1cm5PYmplY3RUb1Bvb2wgPSBmdW5jdGlvbihfcGF0aCwgX29iamVjdCkge1xyXG4gICAgaWYoX3BhdGggPT0gbnVsbCB8fCBfb2JqZWN0ID09IG51bGwpIHJldHVyblxyXG4gICAgXHJcbiAgICBMYXlhLlBvb2wucmVjb3ZlcihfcGF0aCwgX29iamVjdClcclxufVxyXG5cclxuLy8gVUlDb25maWcuQ29udHJvbGxlck5hbWUgPSB7XHJcbi8vICAgICBHYW1lU3RhcnRDb250cm9sbGVyOiBHYW1lU3RhcnRDb250cm9sbGVyLFxyXG4vLyB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVSUNvbmZpZzsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sbGVye1xyXG4gICAgY29uc3RydWN0b3IoX3ZpZXcpe1xyXG4gICAgICAgIGlmKG51bGwgPT0gX3ZpZXcpIHJldHVyblxyXG5cclxuICAgICAgICB0aGlzLnZpZXcgPSBfdmlldztcclxuICAgICAgICB0aGlzLkRhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuSXNPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Jc0Rlc3Ryb3llZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlKCkge1xyXG4gICAgICAgIHRoaXMuSXNEZXN0cm95ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9uQ3JlYXRlKCk7XHJcbiAgICAgICAgdGhpcy52aWV3LkxvYWRWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb3BlbihfZGF0YSkge1xyXG4gICAgICAgIHRoaXMuSXNPcGVuID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkRhdGEgPSBfZGF0YTtcclxuICAgICAgICB0aGlzLm9wZW5PdmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb3Blbk92ZXIoKSB7XHJcbiAgICAgICAgdGhpcy5vbk9wZW4odGhpcy5EYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICBpZih0aGlzLklzT3BlbiA9PSBmYWxzZSkgcmV0dXJuXHJcblxyXG4gICAgICAgIHRoaXMuSXNPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuSXNEZXN0cm95ZWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5Jc0Rlc3Ryb3llZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLnZpZXcgIT0gbnVsbCAmJiB0aGlzLnZpZXcuZGVzdHJveSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXcuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNsb3NlKCkge31cclxuXHJcbiAgICBvbkNyZWF0ZSgpIHt9XHJcblxyXG4gICAgb25PcGVuKF9kYXRhKSB7fVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuRnVpSW1hZ2VVcmwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuRnVpQnVmZmVyVXJsID0gbnVsbDtcclxuICAgICAgICB0aGlzLlBrZyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5Db20gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuVUkgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5vbkRpc3Ryb3koKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5VSSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZhaXJ5Z3VpLkdSb290Lmluc3QucmVtb3ZlQ2hpbGQodGhpcy5VSSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IobGV0IGkgaW4gdGhpcykge1xyXG4gICAgICAgICAgICAvLyDliKDpmaRVSeWvueixoVxyXG4gICAgICAgICAgICBpZih0eXBlb2YodGhpc1tpXSkgPT0gXCJvYmplY3RcIiAmJiB0aGlzW2ldLkRpc3Bvc2UgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpc1tpXS5EaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXN0cm95KCl7fVxyXG5cclxuICAgIExvYWRWaWV3KCkge31cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xyXG5pbXBvcnQgTG9jYWxDb25maWcgZnJvbSBcIi4vTG9jYWxDb25maWdcIjtcclxuaW1wb3J0IEdhbWVTdGFydCBmcm9tIFwiLi9HYW1lU3RhcnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25maWcge1xyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgLy/ms6jlhoxTY3JpcHTmiJbogIVSdW50aW1l5byV55SoXHJcbiAgICAgICAgbGV0IHJlZyA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuXHJcbiAgICB9XHJcbn1cclxuR2FtZUNvbmZpZy53aWR0aCA9IDQ1MDtcclxuR2FtZUNvbmZpZy5oZWlnaHQgPSA4MDA7XHJcbkdhbWVDb25maWcuc2NhbGVNb2RlID1cInNob3dhbGxcIjtcclxuR2FtZUNvbmZpZy5zY3JlZW5Nb2RlID0gXCJob3Jpem9udGFsXCI7XHJcbkdhbWVDb25maWcuYWxpZ25WID0gXCJjZW50ZXJcIjtcclxuR2FtZUNvbmZpZy5hbGlnbkggPSBcImNlbnRlclwiO1xyXG5HYW1lQ29uZmlnLnN0YXJ0U2NlbmUgPSBcIlwiO1xyXG5HYW1lQ29uZmlnLnNjZW5lUm9vdCA9IFwiXCI7XHJcbkdhbWVDb25maWcuZGVidWcgPSBmYWxzZTtcclxuR2FtZUNvbmZpZy5zdGF0ID0gZmFsc2U7XHJcbkdhbWVDb25maWcucGh5c2ljc0RlYnVnID0gZmFsc2U7XHJcbkdhbWVDb25maWcuZXhwb3J0U2NlbmVUb0pzb24gPSB0cnVlO1xyXG5cclxuR2FtZUNvbmZpZy5pbml0KCk7XHJcbiIsImltcG9ydCBMb2NhbENvbmZpZyBmcm9tIFwiLi9Mb2NhbENvbmZpZ1wiO1xyXG4gICAgXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGFydHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgbGV0IF92aWV3ID0gZmFpcnlndWkuR0NvbXBvbmVudDtcclxuXHJcbiAgICAgICAgdGhpcy5fdmlldyA9IGZhaXJ5Z3VpLlVJUGFja2FnZS5jcmVhdGVPYmplY3QoXCJPcmNoYXJkXCIsXCJPcmNoYXJkTWFpblwiKS5hc0NvbTtcclxuICAgICAgICB0aGlzLmJ0bktldHRsZSA9IHRoaXMuX3ZpZXcuZ2V0Q2hpbGQoXCJCdXR0b25fS2V0dGxlXCIpO1xyXG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMuX3ZpZXcuZ2V0Q2hpbGQoXCJDb21wb25lbnRfVHJlZVwiKS5hc0NvbTtcclxuICAgICAgICB0aGlzLkxpbmsgPSB0aGlzLl92aWV3LmdldENoaWxkKFwiVGV4dF9MaW5rXCIpXHJcbiAgICAgICAgdGhpcy5MaW5rLm9uKGxheWEuZXZlbnRzLkV2ZW50LkNMSUNLLHRoaXMsdGhpcy5vbkNsaWNrTGluayk7XHJcblxyXG4gICAgICAgIHRoaXMubHVreSA9IHt9O1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPD0gNjsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5sdWt5W2ldID0gdGhpcy5fdmlldy5nZXRDaGlsZChcImJcIiArIGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jZFRpbWUgPSAxMDtcclxuICAgICAgICAvL+a1h+awtOWKqOaViFxyXG4gICAgICAgIHRoaXMud2F0ZXJUd2VlbiA9IHRoaXMuX3ZpZXcuZ2V0VHJhbnNpdGlvbihcIkVmZmVjdF9XYXRlclwiKTtcclxuICAgICAgICAvL+i/lOWbnuWKqOaViFxyXG4gICAgICAgIHRoaXMuYmFja1R3ZWVuID0gdGhpcy5fdmlldy5nZXRUcmFuc2l0aW9uKFwiRWZmZWN0X0JhY2tcIik7XHJcbiAgICAgICAgLy/moJHmipbliqhcclxuICAgICAgICB0aGlzLnRyZWVTaGFrZUVmZmVjdCA9IHRoaXMudHJlZS5nZXRUcmFuc2l0aW9uKFwiRWZmZWN0X1NoYWtlXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmJ0bktldHRsZS5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsdGhpcy53YXRlclRyZWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tMaW5rKCl7XHJcbiAgICAgICAgLy8gbGF5YS51dGlscy5Ccm93c2VyLndpbmRvdy5sb2NhdGlvbi5ocmVmPVwiaHR0cDovL3d3dy5iaW5nLmNvbVwiO1xyXG4gICAgICAgIGxldCBjZHRpbWVyID0gbmV3IExheWEuVGltZXIoKTtcclxuICAgICAgICBsZXQgY3VydGltZSA9IGNkdGltZXIuY3VyclRpbWVyO1xyXG4gICAgICAgIGxldCBpID0gMDtcclxuXHJcbiAgICAgICAgbGV0IGx1a3lnbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKGNkdGltZXIuY3VyclRpbWVyIDwgMzAwMCArIGN1cnRpbWUpe1xyXG4gICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgaSA9IGkgPiA2ID8gMSA6IGk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmx1a3lbaV0uZmlyZUNsaWNrKCk7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIGNkdGltZXIuY2xlYXIodGhpcywgbHVreWdvKTtcclxuICAgICAgICAgICAgICAgIGNkdGltZXIubG9vcCgxMDAwLCB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNkdGltZXIuY3VyclRpbWVyIDwgdGhpcy5jZFRpbWUgKiAxMDAwICsgY3VydGltZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gaSA+IDYgPyAxIDogaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubHVreVtpXS5maXJlQ2xpY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2R0aW1lci5jbGVhckFsbCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuS2V0dGxlLnRvdWNoYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNkdGltZXIubG9vcCgyMDAsIHRoaXMsIGx1a3lnbylcclxuICAgIH1cclxuXHJcbiAgICAvL+WKoOi9veeVjOmdolxyXG4gICAgYWRkVmlldygpIHtcclxuICAgICAgICBmYWlyeWd1aS5HUm9vdC5pbnN0LmFkZENoaWxkKHRoaXMuX3ZpZXcpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFVJKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liLfmlrDnlYzpnaJcclxuICAgIHJlZnJlc2hVSSgpe1xyXG4gICAgICAgIGxldCBkcm9wID0gTG9jYWxDb25maWcuR2V0RHJvcHMoKTtcclxuICAgICAgICB0aGlzLkxpbmsudGV4dCA9IGRyb3AgPCBMb2NhbENvbmZpZy5TZWVkbGluZy5NYXhEcmlwcyA/IFwi5YaN5rWH5rC0XCIrIChMb2NhbENvbmZpZy5TZWVkbGluZy5NYXhEcmlwcyAtIGRyb3ApICsgXCLmrKFcIiArIExvY2FsQ29uZmlnLlNlZWRsaW5nLk5hbWUgKyBcIuWwsemVv+Wkp+aIkOagkeWVpu+8gVwiIDogXCLmga3llpzvvIFcIiArIExvY2FsQ29uZmlnLlNlZWRsaW5nLk5hbWUgKyBcIuW3sue7j+aIkOeGn+WVpu+8gVwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5byA5aeL5ri45oiPXHJcbiAgICBzdGFydEdhbWUoKSB7XHJcbiAgICAgICAgZmFpcnlndWkuR1Jvb3QuaW5zdC5yZW1vdmVDaGlsZHJlbigpO1xyXG4gICAgICAgIGlmKCFHYW1lTWFpbi5tYWluUGFuZWwpe1xyXG4gICAgICAgICAgICBHYW1lTWFpbi5tYWluUGFuZWwgPSBuZXcgTWFpblBhbmVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWVNYWluLm1haW5QYW5lbC5hZGRWaWV3KCk7XHJcbiAgICAgICAgR2FtZU1haW4ubWFpblBhbmVsLnN0YXJ0R2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHdhdGVyVHJlZSgpe1xyXG4gICAgICAgIHRoaXMuYnRuS2V0dGxlLnRvdWNoYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMud2F0ZXJUd2Vlbi5wbGF5KGxheWEudXRpbHMuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbldhdGVyQ29tcGxldGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBvbldhdGVyQ29tcGxldGUoKXtcclxuICAgICAgICB0aGlzLnRyZWVTaGFrZUVmZmVjdC5wbGF5KGxheWEudXRpbHMuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5rZXR0bGVCYWNrKSk7XHJcbiAgICB9XHJcblxyXG4gICAga2V0dGxlQmFjaygpe1xyXG4gICAgICAgIHRoaXMuYmFja1R3ZWVuLnBsYXkobGF5YS51dGlscy5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLmNvb2xEb3duKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29vbERvd24oKXtcclxuICAgICAgICBMb2NhbENvbmZpZy5TYXZlRHJvcHMoTG9jYWxDb25maWcuR2V0RHJvcHMoKSArIDEpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFVJKCk7XHJcblxyXG4gICAgICAgIGxldCBjZHRpbWVyID0gbmV3IExheWEuVGltZXIoKTtcclxuICAgICAgICBsZXQgY3VydGltZSA9IGNkdGltZXIuY3VyclRpbWVyO1xyXG5cclxuICAgICAgICBsZXQgbG9vcGNkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYoY2R0aW1lci5jdXJyVGltZXIgPCB0aGlzLmNkVGltZSAqIDEwMDAgKyBjdXJ0aW1lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuS2V0dGxlLmdldENvbnRyb2xsZXIoXCJDb29sX0NcIikuc2VsZWN0ZWRJbmRleCA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bktldHRsZS50ZXh0ID0gTWF0aC5jZWlsKCh0aGlzLmNkVGltZSAqIDEwMDAgKyBjdXJ0aW1lIC0gY2R0aW1lci5jdXJyVGltZXIpIC8gMTAwMCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjZHRpbWVyLmNsZWFyKHRoaXMsIGxvb3BjZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bktldHRsZS50b3VjaGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5LZXR0bGUuZ2V0Q29udHJvbGxlcihcIkNvb2xfQ1wiKS5zZWxlY3RlZEluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2R0aW1lci5mcmFtZUxvb3AoMSwgdGhpcywgbG9vcGNkKTtcclxuICAgIH1cclxufSIsInZhciBMb2NhbENvbmZpZyA9IHt9XHJcblxyXG5Mb2NhbENvbmZpZy5PcmNoYXJkTWFpblVJID0ge1xyXG4gICAgRnVpSW1hZ2VVcmw6IFwicmVzL09yY2hhcmRfYXRsYXMwLnBuZ1wiLFxyXG4gICAgRnVpQnVmZmVyVXJsOiBcInJlcy9PcmNoYXJkLmZ1aVwiLFxyXG59XHJcblxyXG5Mb2NhbENvbmZpZy5TZWVkbGluZyA9IHtcclxuICAgIE5hbWU6XCLpppnmqZnmoJFcIixcclxuICAgIE1heERyaXBzOjgwXHJcbn1cclxuXHJcbkxvY2FsQ29uZmlnLkdldERyb3BzID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBkcm9wID0gTGF5YS5Mb2NhbFN0b3JhZ2UuZ2V0SlNPTihcIkRyb3BzXCIpO1xyXG4gICAgcGFyc2VJbnQoSlNPTi5zdHJpbmdpZnkoZHJvcCkpO1xyXG4gICAgcmV0dXJuIGRyb3AgPT0gbnVsbCA/IDAgOiBkcm9wO1xyXG59XHJcblxyXG5Mb2NhbENvbmZpZy5TYXZlRHJvcHMgPSBmdW5jdGlvbihfdmFsdWUpe1xyXG4gICAgTGF5YS5Mb2NhbFN0b3JhZ2Uuc2V0SlNPTihcIkRyb3BzXCIsIF92YWx1ZSlcclxufVxyXG5cclxuTG9jYWxDb25maWcuR2FtZXN0YXJ0ID0gXCIuL0dhbWVTdGFydFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9jYWxDb25maWc7IiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgVUlDb25maWcgZnJvbSBcIi4vQ29uZmlnL1VJQ29uZmlnXCI7XHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vTWFuYWdlci9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVTdGFydENvbnRyb2xsZXIgZnJvbSBcIi4vVUkvR2FtZVN0YXJ0Q29udHJvbGxlclwiO1xyXG5cclxuY2xhc3MgTWFpbiB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRmYWlyeWd1aS5VSUNvbmZpZy5wYWNrYWdlRmlsZUV4dGVuc2lvbiA9IFwianNvblwiO1xyXG5cdFx0Ly/moLnmja5JREXorr7nva7liJ3lp4vljJblvJXmk45cdFx0XHJcblx0XHRpZiAod2luZG93W1wiTGF5YTNEXCJdKSBMYXlhM0QuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCk7XHJcblx0XHRlbHNlIExheWEuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCwgTGF5YVtcIldlYkdMXCJdKTtcclxuXHRcdExheWFbXCJQaHlzaWNzXCJdICYmIExheWFbXCJQaHlzaWNzXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YVtcIkRlYnVnUGFuZWxcIl0gJiYgTGF5YVtcIkRlYnVnUGFuZWxcIl0uZW5hYmxlKCk7XHJcblx0XHRMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IEdhbWVDb25maWcuc2NhbGVNb2RlO1xyXG5cdFx0TGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gR2FtZUNvbmZpZy5zY3JlZW5Nb2RlO1xyXG5cdFx0TGF5YS5zdGFnZS5hbGlnblYgPSBHYW1lQ29uZmlnLmFsaWduVjtcclxuXHRcdExheWEuc3RhZ2UuYWxpZ25IID0gR2FtZUNvbmZpZy5hbGlnbkg7XHJcblx0XHQvL+WFvOWuueW+ruS/oeS4jeaUr+aMgeWKoOi9vXNjZW5l5ZCO57yA5Zy65pmvXHJcblx0XHRMYXlhLlVSTC5leHBvcnRTY2VuZVRvSnNvbiA9IEdhbWVDb25maWcuZXhwb3J0U2NlbmVUb0pzb247XHJcblxyXG5cdFx0Ly/miZPlvIDosIPor5XpnaLmnb/vvIjpgJrov4dJREXorr7nva7osIPor5XmqKHlvI/vvIzmiJbogIV1cmzlnLDlnYDlop7liqBkZWJ1Zz10cnVl5Y+C5pWw77yM5Z2H5Y+v5omT5byA6LCD6K+V6Z2i5p2/77yJXHJcblx0XHRpZiAoR2FtZUNvbmZpZy5kZWJ1ZyB8fCBMYXlhLlV0aWxzLmdldFF1ZXJ5U3RyaW5nKFwiZGVidWdcIikgPT0gXCJ0cnVlXCIpIExheWEuZW5hYmxlRGVidWdQYW5lbCgpO1xyXG5cdFx0aWYgKEdhbWVDb25maWcucGh5c2ljc0RlYnVnICYmIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdKSBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXS5lbmFibGUoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnN0YXQpIExheWEuU3RhdC5zaG93KCk7XHJcblx0XHRMYXlhLmFsZXJ0R2xvYmFsRXJyb3IgPSB0cnVlO1xyXG5cclxuXHRcdC8v5r+A5rS76LWE5rqQ54mI5pys5o6n5Yi277yMdmVyc2lvbi5qc29u55SxSURF5Y+R5biD5Yqf6IO96Ieq5Yqo55Sf5oiQ77yM5aaC5p6c5rKh5pyJ5Lmf5LiN5b2x5ZON5ZCO57ut5rWB56iLXHJcblx0XHRMYXlhLlJlc291cmNlVmVyc2lvbi5lbmFibGUoXCJ2ZXJzaW9uLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uVmVyc2lvbkxvYWRlZCksIExheWEuUmVzb3VyY2VWZXJzaW9uLkZJTEVOQU1FX1ZFUlNJT04pO1xyXG5cdH1cclxuXHJcblx0b25WZXJzaW9uTG9hZGVkKCkge1xyXG5cdFx0Ly/mv4DmtLvlpKflsI/lm77mmKDlsITvvIzliqDovb3lsI/lm77nmoTml7blgJnvvIzlpoLmnpzlj5HnjrDlsI/lm77lnKjlpKflm77lkIjpm4bph4zpnaLvvIzliJnkvJjlhYjliqDovb3lpKflm77lkIjpm4bvvIzogIzkuI3mmK/lsI/lm75cclxuXHRcdExheWEuQXRsYXNJbmZvTWFuYWdlci5lbmFibGUoXCJmaWxlY29uZmlnLmpzb25cIik7XHJcblxyXG5cdFx0bGV0IHZpZXdOYW1lID0gVUlDb25maWcuVmlld05hbWVcclxuXHRcdExheWEubG9hZGVyLmxvYWQoW3sgdXJsOiB2aWV3TmFtZS5PcmNoYXJkTWFpblVJLkZ1aUltYWdlVXJsLCB0eXBlOiBsYXlhLm5ldC5Mb2FkZXIuSU1BR0UgfSxcclxuICAgICAgICAgICAgeyB1cmw6IHZpZXdOYW1lLk9yY2hhcmRNYWluVUkuRnVpQnVmZmVyVXJsLCB0eXBlOiBsYXlhLm5ldC5Mb2FkZXIuQlVGRkVSIH1cclxuXHRcdF0sIGxheWEudXRpbHMuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG5cdFx0Ly8gTGF5YS5VUkwuYmFzZVBhdGggPSBcImh0dHA6Ly8xOTIuMTY4LjEuNjQ6ODA4MC9PcmNoYXJkL1wiO1xyXG5cdH1cclxuXHJcblx0b25Db25maWdMb2FkZWQoKSB7XHJcblx0XHQvL+WKoOi9vUlEReaMh+WumueahOWcuuaZr1xyXG5cdFx0Ly8gR2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG5cclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKGZhaXJ5Z3VpLkdSb290Lmluc3QuZGlzcGxheU9iamVjdCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZmFpcnlndWkuVUlQYWNrYWdlLmFkZFBhY2thZ2UoXCJyZXMvT3JjaGFyZFwiKTtcclxuXHJcblx0XHRVSU1hbmFnZXIub3BlbkNvbnRyb2xsZXIoR2FtZVN0YXJ0Q29udHJvbGxlcik7XHJcblx0XHQvLyBVSU1hbmFnZXIub3BlbkNvbnRyb2xsZXIobmV3IEdhbWVTdGFydENvbnRyb2xsZXIoKSk7XHJcblx0fVxyXG59XHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBNYWluKCk7XHJcbiIsImltcG9ydCBWaWV3IGZyb20gXCIuLi9Db3JlL1ZpZXdcIjtcclxuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSBcIi4uL0NvcmUvQ29udHJvbGxlclwiO1xyXG5cclxubGV0IFVJTWFuYWdlciA9IHt9XHJcblxyXG5VSU1hbmFnZXIuVmlldyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHZpZXcgPSBuZXcgVmlldygpO1xyXG4gICAgcmV0dXJuIHZpZXc7XHJcbn1cclxuXHJcblVJTWFuYWdlci5Db250cm9sbGVyID0gZnVuY3Rpb24oX3ZpZXcpIHtcclxuICAgIGlmKF92aWV3ID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICByZXR1cm4gbmV3IENvbnRyb2xsZXIoX3ZpZXcpO1xyXG59XHJcblxyXG5VSU1hbmFnZXIub3BlbkNvbnRyb2xsZXIgPSBmdW5jdGlvbihfbmFtZSwgX2RhdGEpIHtcclxuICAgIGlmKF9uYW1lID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICBfbmFtZS5jcmVhdGUoKTtcclxuICAgIF9uYW1lLm9wZW4oX2RhdGEpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVSU1hbmFnZXI7IiwiaW1wb3J0IFVJQ29uZmlnIGZyb20gXCIuLi9Db25maWcvVUlDb25maWdcIjtcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi4vTWFuYWdlci9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVTdGFydFZpZXcgZnJvbSBcIi4uL1VJL0dhbWVTdGFydFZpZXdcIjtcclxuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSBcIi4uL0NvcmUvQ29udHJvbGxlclwiO1xyXG5cclxubGV0IGN0cmwgPSBVSU1hbmFnZXIuQ29udHJvbGxlcihHYW1lU3RhcnRWaWV3KTtcclxuXHJcbmN0cmwub25PcGVuID0gZnVuY3Rpb24oX2RhdGEpIHtcclxuICAgIHRoaXMudmlldy5yZWZyZXNoVUkoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3RybDtcclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGFydENvbnRyb2xsZXIgZXh0ZW5kcyBDb250cm9sbGVye1xyXG4vLyAgICAgY29uc3RydWN0b3IoKXtcclxuLy8gICAgICAgICBzdXBlcihHYW1lU3RhcnRWaWV3KTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBvbk9wZW4oKXtcclxuLy8gICAgICAgICB0aGlzLnZpZXcucmVmcmVzaFVJKCk7XHJcbi8vICAgICB9XHJcbi8vIH0iLCJpbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLi9NYW5hZ2VyL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgVUlDb25maWcgZnJvbSBcIi4uL0NvbmZpZy9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgTG9jYWxDb25maWcgZnJvbSBcIi4uL0xvY2FsQ29uZmlnXCI7XHJcblxyXG5sZXQgdmlldyA9IFVJTWFuYWdlci5WaWV3KCk7XHJcblxyXG52aWV3LkxvYWRWaWV3ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgdmlld05hbWUgPSBVSUNvbmZpZy5WaWV3TmFtZVxyXG4gICAgdGhpcy5GdWlJbWFnZVVybCA9IHZpZXdOYW1lLk9yY2hhcmRNYWluVUkuRnVpSW1hZ2VVcmw7XHJcbiAgICB0aGlzLkZ1aUJ1ZmZlclVybCA9IHZpZXdOYW1lLk9yY2hhcmRNYWluVUkuRnVpQnVmZmVyVXJsO1xyXG4gICAgdGhpcy5Qa2cgPSB2aWV3TmFtZS5PcmNoYXJkTWFpblVJLlBrZztcclxuICAgIHRoaXMuQ29tID0gdmlld05hbWUuT3JjaGFyZE1haW5VSS5Db207XHJcbiAgICB0aGlzLlVJID0gZmFpcnlndWkuVUlQYWNrYWdlLmNyZWF0ZU9iamVjdCh0aGlzLlBrZywgdGhpcy5Db20pLmFzQ29tO1xyXG4gICAgZmFpcnlndWkuR1Jvb3QuaW5zdC5hZGRDaGlsZCh0aGlzLlVJKTtcclxuXHJcbiAgICB0aGlzLmJ0bktldHRsZSA9IHRoaXMuVUkuZ2V0Q2hpbGQoXCJCdXR0b25fS2V0dGxlXCIpO1xyXG4gICAgdGhpcy50cmVlID0gdGhpcy5VSS5nZXRDaGlsZChcIkNvbXBvbmVudF9UcmVlXCIpLmFzQ29tO1xyXG4gICAgdGhpcy5MaW5rID0gdGhpcy5VSS5nZXRDaGlsZChcIlRleHRfTGlua1wiKVxyXG4gICAgdGhpcy5MaW5rLm9uKGxheWEuZXZlbnRzLkV2ZW50LkNMSUNLLHRoaXMsdGhpcy5vbkNsaWNrTGluayk7XHJcblxyXG4gICAgdGhpcy5sdWt5ID0ge307XHJcbiAgICBmb3IobGV0IGkgPSAxOyBpIDw9IDY7IGkrKyl7XHJcbiAgICAgICAgdGhpcy5sdWt5W2ldID0gdGhpcy5VSS5nZXRDaGlsZChcImJcIiArIGkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2RUaW1lID0gMTA7XHJcbiAgICAvL+a1h+awtOWKqOaViFxyXG4gICAgdGhpcy53YXRlclR3ZWVuID0gdGhpcy5VSS5nZXRUcmFuc2l0aW9uKFwiRWZmZWN0X1dhdGVyXCIpO1xyXG4gICAgLy/ov5Tlm57liqjmlYhcclxuICAgIHRoaXMuYmFja1R3ZWVuID0gdGhpcy5VSS5nZXRUcmFuc2l0aW9uKFwiRWZmZWN0X0JhY2tcIik7XHJcbiAgICAvL+agkeaKluWKqFxyXG4gICAgdGhpcy50cmVlU2hha2VFZmZlY3QgPSB0aGlzLnRyZWUuZ2V0VHJhbnNpdGlvbihcIkVmZmVjdF9TaGFrZVwiKTtcclxuXHJcbiAgICB0aGlzLmJ0bktldHRsZS5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsdGhpcy53YXRlclRyZWUpO1xyXG59XHJcblxyXG52aWV3Lm9uQ2xpY2tMaW5rID0gZnVuY3Rpb24oKXtcclxuICAgIC8vIGxheWEudXRpbHMuQnJvd3Nlci53aW5kb3cubG9jYXRpb24uaHJlZj1cImh0dHA6Ly93d3cuYmluZy5jb21cIjtcclxuICAgIGxldCBjZHRpbWVyID0gbmV3IExheWEuVGltZXIoKTtcclxuICAgIGxldCBjdXJ0aW1lID0gY2R0aW1lci5jdXJyVGltZXI7XHJcbiAgICBsZXQgaSA9IDA7XHJcblxyXG4gICAgbGV0IGx1a3lnbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoY2R0aW1lci5jdXJyVGltZXIgPCAzMDAwICsgY3VydGltZSl7XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgaSA9IGkgPiA2ID8gMSA6IGk7XHJcbiAgICAgICAgICAgIHRoaXMubHVreVtpXS5maXJlQ2xpY2soKTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGNkdGltZXIuY2xlYXIodGhpcywgbHVreWdvKTtcclxuICAgICAgICAgICAgY2R0aW1lci5sb29wKDEwMDAsIHRoaXMsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNkdGltZXIuY3VyclRpbWVyIDwgdGhpcy5jZFRpbWUgKiAxMDAwICsgY3VydGltZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGkgPiA2ID8gMSA6IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubHVreVtpXS5maXJlQ2xpY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNkdGltZXIuY2xlYXJBbGwodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuS2V0dGxlLnRvdWNoYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNkdGltZXIubG9vcCgyMDAsIHRoaXMsIGx1a3lnbylcclxufVxyXG5cclxuLy/liLfmlrDnlYzpnaJcclxudmlldy5yZWZyZXNoVUkgPSBmdW5jdGlvbigpe1xyXG4gICAgbGV0IGRyb3AgPSBMb2NhbENvbmZpZy5HZXREcm9wcygpO1xyXG4gICAgdGhpcy5MaW5rLnRleHQgPSBkcm9wIDwgTG9jYWxDb25maWcuU2VlZGxpbmcuTWF4RHJpcHMgPyBcclxuICAgIFwi5YaN5rWH5rC0XCIrIChMb2NhbENvbmZpZy5TZWVkbGluZy5NYXhEcmlwcyAtIGRyb3ApICsgXCLmrKFcIiArIExvY2FsQ29uZmlnLlNlZWRsaW5nLk5hbWUgKyBcIuWwsemVv+Wkp+aIkOagkeWVpu+8gVwiIDogXHJcbiAgICBcIuaBreWWnO+8gVwiICsgTG9jYWxDb25maWcuU2VlZGxpbmcuTmFtZSArIFwi5bey57uP5oiQ54af5ZWm77yBXCI7XHJcbn1cclxuXHJcbnZpZXcud2F0ZXJUcmVlID0gZnVuY3Rpb24oKXtcclxuICAgIHRoaXMuYnRuS2V0dGxlLnRvdWNoYWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy53YXRlclR3ZWVuLnBsYXkobGF5YS51dGlscy5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uV2F0ZXJDb21wbGV0ZSkpO1xyXG4gICAgTG9jYWxDb25maWcuU2F2ZURyb3BzKExvY2FsQ29uZmlnLkdldERyb3BzKCkgKyAxKTtcclxuICAgIFxyXG4gICAgbGV0IHhociA9IG5ldyBMYXlhLkh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIuaHR0cC50aW1lb3V0ID0gMTAwMDA7XHJcbiAgICB4aHIub25jZShFdmVudC5DT01QTEVURSx0aGlzLHRoaXMuY29tcGxldGVIYW5kbGVyKTtcclxuICAgIHhoci5vbmNlKEV2ZW50LkVSUk9SLHRoaXMsdGhpcy5lcnJvckhhbmRsZXIpO1xyXG4gICAgeGhyLm9uKEV2ZW50LlBST0dSRVNTLHRoaXMsdGhpcy5wcm9jZXNzSGFuZGxlcik7XHJcbiAgICB4aHIuc2VuZChcImh0dHA6Ly8xOTIuMTY4LjEuNjQ6ODA4MFwiLFwi6Zu354y0R2/vvIFcIixcImdldFwiLFwidGV4dFwiKTtcclxufVxyXG5cclxudmlldy5wcm9jZXNzSGFuZGxlciA9IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgY29uc29sZS5sb2coZGF0YSk7XHJcbn1cclxuXHJcbnZpZXcuZXJyb3JIYW5kbGVyID0gZnVuY3Rpb24oZGF0YSl7XHJcbn1cclxuXHJcbnZpZXcuY29tcGxldGVIYW5kbGVyID0gZnVuY3Rpb24oZSl7XHJcbn1cclxuLy/mtYfmsLTlrozmiJBcclxudmlldy5vbldhdGVyQ29tcGxldGUgPSBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy50cmVlU2hha2VFZmZlY3QucGxheShsYXlhLnV0aWxzLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMua2V0dGxlQmFjaykpO1xyXG59XHJcblxyXG52aWV3LmtldHRsZUJhY2sgPSBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5iYWNrVHdlZW4ucGxheShsYXlhLnV0aWxzLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMuY29vbERvd24pKTtcclxufVxyXG5cclxudmlldy5jb29sRG93biA9IGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLnJlZnJlc2hVSSgpO1xyXG5cclxuICAgIGxldCBjZHRpbWVyID0gbmV3IExheWEuVGltZXIoKTtcclxuICAgIGxldCBjdXJ0aW1lID0gY2R0aW1lci5jdXJyVGltZXI7XHJcblxyXG4gICAgbGV0IGxvb3BjZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoY2R0aW1lci5jdXJyVGltZXIgPCB0aGlzLmNkVGltZSAqIDEwMDAgKyBjdXJ0aW1lKXtcclxuICAgICAgICAgICAgdGhpcy5idG5LZXR0bGUuZ2V0Q29udHJvbGxlcihcIkNvb2xfQ1wiKS5zZWxlY3RlZEluZGV4ID0gMTtcclxuICAgICAgICAgICAgdGhpcy5idG5LZXR0bGUudGV4dCA9IE1hdGguY2VpbCgodGhpcy5jZFRpbWUgKiAxMDAwICsgY3VydGltZSAtIGNkdGltZXIuY3VyclRpbWVyKSAvIDEwMDApLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNkdGltZXIuY2xlYXIodGhpcywgbG9vcGNkKTtcclxuICAgICAgICAgICAgdGhpcy5idG5LZXR0bGUudG91Y2hhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5idG5LZXR0bGUuZ2V0Q29udHJvbGxlcihcIkNvb2xfQ1wiKS5zZWxlY3RlZEluZGV4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2R0aW1lci5mcmFtZUxvb3AoMSwgdGhpcywgbG9vcGNkKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHZpZXc7Il19
