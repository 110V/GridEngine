import Area from "./Area";
import HtmlRenderer from "./HtmlRenderer/HtmlRenderer";
import Position from "./Position";
import { randomId } from "./Utils";
import { Vector2 } from "./Vector2";

enum ChangeTarget{
    size,
    area
}
enum ChangeType{
    remove,
    create,
    change
}

interface GridChange{
    target:ChangeTarget;
    type:ChangeType;
    pos?:Position;
    size?:Vector2;
}

export default class Grid {
    private _size: Vector2 = { x: 0, y: 0 };
    private _areas: {[id:string]:Area} = {};
    private _changes: GridChange[] = [];
    
    constructor(size: Vector2) {
        this._size = size;
    }

    public get areas() {
        return this._areas
    }
    public get size() {
        return this._size;
    }

    public resizeGrid(size: Vector2) {
        this._size = size;
        this._changes.push({target:ChangeTarget.size,type:ChangeType.change,size:size});
    }

    public makeArea(pos: Position, size: Vector2,isWidthFixed:boolean = false,isHeightFiexed:boolean = false,id:string=randomId("area")): Area {
        const newArea = new Area(pos, size,isWidthFixed,isHeightFiexed,id);
        this._areas[id] = newArea;
        this._changes.push({target:ChangeTarget.area,type:ChangeType.create,pos:pos,size:size});
        return newArea;
    }

    public area(id:string): Area {
        return this._areas[id];
    }

    public render(renderer: HtmlRenderer): HTMLElement[] {
        return renderer.renderGrid(this)
    }
}