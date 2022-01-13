import Area from "./Area";
import HtmlRenderer from "./HtmlRenderer/HtmlRenderer";
import Position from "./Position";
import { randomId } from "./Utils";
import { Vector2 } from "./Vector2";

export default class Grid {
    private _size: Vector2 = { x: 0, y: 0 };
    private _areas: {[id:string]:Area} = {};
    private _sizeChanged:boolean = false;
    private _changedArea:Area[] = [];
    
    constructor(size: Vector2) {
        this._size = size;
    }

    public get areas() {
        return Object.values(this._areas);
    }
    public get size() {
        return this._size;
    }

    public resizeGrid(size: Vector2) {
        this._size = size;
        this._sizeChanged = true;
    }

    public makeArea(pos: Position, size: Vector2,isWidthFixed:boolean = false,isHeightFiexed:boolean = false,id:string=randomId("area")): Area {
        const newArea = new Area(pos, size,isWidthFixed,isHeightFiexed,id);
        this._areas[id] = newArea;
        this._changedArea.push(newArea);
        return newArea;
    }

    public area(id:string): Area {
        return this._areas[id];
    }

    public render(renderer: HtmlRenderer): HTMLElement[] {
        const result = renderer.renderGrid(this,this._sizeChanged,this._changedArea);
        this._sizeChanged = false;
        this._changedArea = [];
        return result;
    }
}