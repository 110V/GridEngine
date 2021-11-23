import Content from "./Content";
import Grid from "./Grid";
import Position from "./Position";
import Renderer from "./Renderer";
import Vector2 from "./Vector2";

export default class Area {
    private _position: Position = { x: 0, y: 0, z: 0 };
    private _size: Vector2 = { x: 0, y: 0 };

    private _child: Grid | Content | undefined;
    //TODO add flu

    public get position() {
        return this._position;
    }

    public get size() {
        return this._size;
    }

    public writeContent(content:Content){
        this._child = content;
    }

    constructor(position: Position, size: Vector2) {
        this._position = position;
        this._size = size;
    }

    public get child(){
        return this._child;
    }

    public render(renderer:Renderer) {
        renderer.renderArea(this);
    }

    public update() {
        
    }
}