import Content from "./Content";
import Grid from "./Grid";
import HtmlRenderer from "./HtmlRenderer/HtmlRenderer";
import Position from "./Position";
import { randomId } from "./Utils";
import { addVector2, Vector2 } from "./Vector2";

export default class Area {
    private _id:string;
    private _position: Position = { x: 0, y: 0};
    private _size: Vector2 = { x: 0, y: 0 };
    private _child: Grid | Content | null = null;
    private _isFixedWidth:boolean = false;
    private _isFixedHeight:boolean = false;
    private _isStatic:boolean = false;
    private _isPropertyChanged:boolean = false;
    private _isChildChanged:boolean = false;

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

    public get isStatic() {
        return this._isStatic;
    }

    public set position(position: Position) {
        this._position = position; 
    }

    public set size(size:Vector2){
        this._size = size;
    }


    public setChild = (child:Content|Grid)=>{
        this._child = child;
        this._isChildChanged = true;
    }

    public findRenderedHtmlElement():HTMLElement|null {
        return document.getElementById(this.id);
    }

    public changeSize(size:Vector2){
        this._isPropertyChanged = true;
        this._size = size;
    }

    public changePosition(position:Position){
        this._position = position;
    }

    constructor(position: Position, size: Vector2, isFixedWidth = false,isFixedHeight = false,id=randomId("area")) {
        this._isFixedWidth = isFixedWidth;
        this._isFixedHeight = isFixedHeight;
        this._position = position;
        this._size = size;
        this._id = id;
    }

    public render = (renderer: HtmlRenderer): HTMLElement => {
        return renderer.renderArea(this);
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