import Area from "./Area";

export default class Flu<T> {
    private _subjects: Area[] = [];
    private _value: T;

    constructor(value: T) {
        this._value = value;
    }

    public set(value: T) {
        this._value = value;
        this._subjects.map((s) => { s.update() });
    }

    public register(area: Area): () => T {
        this._subjects.push(area);
        return () => { return this._value };
    }

}