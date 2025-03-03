export class Deltatime {
    constructor(){
        this._value = 0;
        this.eventTarget = new EventTarget();
        this.update = null;
        this.intervalRate = 10;
    }

    get value(){
        return this._value;
    }

    set value(newValue){
        if (this._value !== newValue){
            this._value = newValue;
            this.eventTarget.dispatchEvent(new Event("valueChanged"));
        }
    }

    onChange(callback){
        this.eventTarget.addEventListener("valueChanged", callback);
    }

    start(){
        this.update = setInterval(() => {
            this.value = this.value + 1;
        }, this.intervalRate);
    }

    stop(){
        clearInterval(this.update);
        this.value = 0;
    }
}
