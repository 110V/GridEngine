import Content from "../Content";
import Renderer from "../Renderer";

export default class Text extends Content {
    private _value:string = "";

    constructor(value:string) {
        super();
        this._value = value;
    }

    public set value(value:string){
        this._value;
    }

    public get value(){
        return this._value;
    }

    public render(renderer:Renderer){
        return renderer.renderText(this);
    }
}