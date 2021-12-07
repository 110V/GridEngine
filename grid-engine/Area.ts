import Content from "./Content";
import Flu from "./Flu";
import Grid from "./Grid";
import HtmlRenderer from "./HtmlRenderer/HtmlRenderer";
import Position from "./Position";
import { randomId } from "./Utils";
import { addVector2, Vector2 } from "./Vector2";

export default class Area {
    private _id:string;
    private _renderer:HtmlRenderer|null = null;
    private _position: Position = { x: 0, y: 0};
    private _size: Vector2 = { x: 0, y: 0 };
    private _child: Grid | Content | null = null;
    private _flus:Flu<any>[] = [];
    private _isFixedWidth:boolean = false;
    private _isFixedHeight:boolean = false;

    public get position() {
        return this._position;
    }

    public get size() {
        return this._size;
    }

    public get id() {
        return this._id;
    }
    
    public get child() {
        return this._child;
    }

    public get isFixedWidth() {
        return this._isFixedWidth;
    }

    public get isFixedHeight() {
        return this._isFixedHeight;
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

    public changeSize(size:Vector2,update = false){
        this._size = size;
        if(update) {
            this.update();
        }
    }

    public changePosition(position:Position,update = false){
        this._position = position;
        if(update) {
            this.update();
        }
    }

    constructor(position: Position, size: Vector2,isFixedWidth = false,isFixedHeight = false) {
        this._isFixedWidth = isFixedWidth;
        this._isFixedHeight = isFixedHeight;
        this._position = position;
        this._size = size;
        this._id = randomId("area");
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

    public checkRowInArea(row:number) {  
        const lu = this.position;
        const rd = addVector2(lu, this.size);
        return (lu.y <= row) && (row <= rd.y);
    }

    public checkColumnInArea(column:number) {
        const lu = this.position;
        const rd = addVector2(lu, this.size);
        return (lu.y <= column) && (column <= rd.y);
    }

    public checkInArea(point:Vector2) {
        const lu = this.position;
        const rd = addVector2(lu, this.size);
        const x = point.x;
        const y = point.y;
        return (lu.x <= x) && (x <= rd.x) && (lu.y <= y) && (y <= rd.y);
    }

    public checkLongColumnInArea(column: number, length: number) {
        return this.checkRowInArea(column) || this.checkColumnInArea(column + length);
    }

    public checkLongRowInArea(row: number, length: number) {
        return this.checkRowInArea(row) || this.checkColumnInArea(row + length);
    }
}