export default class Controller{
    constructor(_view){
        if(null == _view) return

        this.view = _view;
        this.Data = null;
        this.IsOpen = false;
        this.IsDestroyed = true;
    }

    create() {
        this.IsDestroyed = false;
        this.onCreate();
        this.view.LoadView();
    }

    open(_data) {
        this.IsOpen = true;
        this.Data = _data;
        this.openOver();
    }

    openOver() {
        this.onOpen(this.Data);
    }

    close() {
        if(this.IsOpen == false) return

        this.IsOpen = false;
        this.onClose();

        if(this.IsDestroyed == false) {
            this.IsDestroyed = true;

            if(this.view != null && this.view.destroy != null) {
                this.view.destroy();
                this.view = null;
            }
        }
    }

    onClose() {}

    onCreate() {}

    onOpen(_data) {}
}