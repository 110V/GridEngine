import Content from "./Content";
import Flu from "./Flu";
import Grid from "./Grid";
import HtmlRenderer from "./HtmlRenderer/HtmlRenderer";
import Position from "./Position";
import { randomId } from "./Utils";
import Vector2 from "./Vector2";

export default class Area {
    private _id:string;
    private _renderer:HtmlRenderer|null = null;
    private _position: Position = { x: 0, y: 0, z: 0 };
    private _size: Vector2 = { x: 0, y: 0 };
    private _child: Grid | Content | null = null;
    private _flus:Flu<any>[] = [];

    public get position() {
        return this._position;
    }

    public get size() {
        return this._size;
    }

    public get id(){
        return this._id;
    }

    public setChild = (child:Content|Grid)=>{
        this._flus.forEach((f)=>{f.unregister(this)})
        this._child = child;
        if(child instanceof Content) {
            this._flus = child.flus;
            child.flus.forEach((f)=>{
                f.register(this);
            })
        }
        else{
            this._flus = [];
        }
    }

    public findRenderedHtmlElement():HTMLElement|null {
        return document.getElementById(this.id);
    }

    constructor(position: Position, size: Vector2) {
        this._position = position;
        this._size = size;
        this._id = randomId("area");
    }

    public get child() {
        return this._child;
    }

    public render = (renderer: HtmlRenderer): HTMLElement | null => {
        this._renderer = renderer;
        return renderer.renderArea(this);
    }

    public update() {
        const element = this.findRenderedHtmlElement();
        if (!this._renderer || !element) {
            console.log("this Area can be updated after First Render");
            return
        }
        const rendered = this.render(this._renderer);
        if (rendered) {
            element.replaceWith(rendered);
        }
        else {
            element.replaceWith(document.createElement("div"));
        }
    }
}