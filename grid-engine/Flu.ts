import Area from "./Area";

export default class Flu<T> {
    private _subjects: Area[] = [];
    private _value: T;

    constructor(value: T) {
        this._value = value;
    }

    public set = (value: T) => {
        this._value = value;
        this._subjects.map((s) => { s.update() });
    }

    public get = ()=>{
        return this._value;
    }
    public register(area: Area) {
        this._subjects.push(area);
    }

    public unregister(area:Area){
        this._subjects = this._subjects.filter((a)=>a!=area);
    }

}