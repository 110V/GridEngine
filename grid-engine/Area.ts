import Content from "./Content";
import Grid from "./Grid";
import Position from "./Position";
import Renderer from "./Renderer";
import { randomId } from "./Utils";
import Vector2 from "./Vector2";

export default class Area {
    private _id:string;
    private _position: Position = { x: 0, y: 0, z: 0 };
    private _size: Vector2 = { x: 0, y: 0 };
    private _child: Grid | Content | null = null;
    //TODO add flu

    public get position() {
        return this._position;
    }

    public get size() {
        return this._size;
    }

    public get id(){
        return this._id;
    }

    public setChild(child:Content|Grid){
        this._child = child;
    }

    constructor(position: Position, size: Vector2) {
        this._position = position;
        this._size = size;
        this._id = randomId("area");
    }

    public get child(){
        return this._child;
    }

    public render = (renderer:Renderer):string => {
        return renderer.renderArea(this);
    }

    public update() {
        
    }
}