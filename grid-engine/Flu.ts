import Area from "./Area";

export default class Flu<T> {
    private _subjects: Area[] = [];
    private _value: T;

    constructor(value: T) {
        this._value = value;
    }

    private set = (value: T) => {
        this._value = value;
        this._subjects.map((s) => { s.update() });
    }

    public register(area: Area) {
        this._subjects.push(area);
    }

    public unregister(area:Area){
        this._subjects = this._subjects.filter((a)=>a!=area);
    }

}