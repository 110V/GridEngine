import Area from "./Area";

export default class Flu<T> {
    private _funcs: ((value:T)=>void)[] = [];
    private _value: T;

    constructor(value: T) {
        this._value = value;
    }

    public set = (value: T) => {
        if(this._value==value){
            return;
        }
        this._value = value;
        this._funcs.forEach((f) => {f(value)});
    }
    //TODO make priority
    public register(func:((value:T)=>void),firstRun:boolean = true):((value:T)=>void) {
        this._funcs.push(func);
        if(firstRun){
            func(this._value);
        }
        return this.set;
    }

    public unregister(func:((value:T)=>void)) {
        this._funcs = this._funcs.filter((f)=>f!=func);
    }

}