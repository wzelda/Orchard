export default class View {
    constructor(){
        this.FuiImageUrl = null;
        this.FuiBufferUrl = null;
        this.Pkg = null;
        this.Com = null;
        this.UI = null;
    }

    destroy() {
        this.onDistroy();

        if(this.UI != null) {
            fairygui.GRoot.inst.removeChild(this.UI);
        }

        for(let i in this) {
            // 删除UI对象
            if(typeof(this[i]) == "object" && this[i].Dispose != null) {
                this[i].Dispose();
            }
        }
    }

    onDistroy(){}

    LoadView() {}
}