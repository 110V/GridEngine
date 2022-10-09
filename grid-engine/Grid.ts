import Area from "./Area";
import BlockSizing from "./HtmlRenderer/BlockSizing";
import HtmlRenderer from "./HtmlRenderer/HtmlRenderer";
import Position from "./Position";
import { randomId } from "./Utils";
import { Vector2 } from "./Vector2";

export default class Grid {
    private _size: Vector2 = { x: 0, y: 0 };
    private _areas: { [id: string]: Area } = {};
    private _sizeChanged: boolean = false;
    private _newAreas: Area[] = [];
    private _removedAreas: Area[] = [];
    private _id:string;
    
    constructor(size: Vector2,id = randomId("grid")) {
        this._size = size;
        this._id = id;
    }

    public get areas() {
        return Object.values(this._areas);
    }
    public get size() {
        return this._size;
    }
    public get id(){
        return this._id;
    }

    public resizeGrid(size: Vector2) {
        this._size = size;
        this._sizeChanged = true;
    }

    public makeArea(pos: Position, size: Vector2, fixedSize:Vector2,isWidthFixed: boolean = false, isHeightFiexed: boolean = false, id: string = randomId("area")): Area {
        const newArea = new Area(pos, size, fixedSize,isWidthFixed, isHeightFiexed, id);
        this._newAreas.push(newArea);
        this._areas[id] = newArea;
        return newArea;
    }

    public removeArea(id: string) {
        this._removedAreas.push(this._areas[id]);
        delete this._areas[id];
    }

    public area(id: string): Area {
        return this._areas[id];
    }

    public render(renderer: HtmlRenderer): HTMLElement[] {
        let result: HTMLElement[] = [];
        renderer.unloadAreas(this._removedAreas);
        let needRepositioning = false;
        for (const area of this.areas) {
            area.render(renderer);
            needRepositioning = needRepositioning||area.isTransformChanged;
        }
        const blockSizing = new BlockSizing(this);
        for(const area of this._newAreas){
            const rendered = area.render(renderer);
            if(rendered){
                renderer.setArea(blockSizing, area, rendered);
                result.push(rendered);
            }
        }
        needRepositioning = this._sizeChanged;
        this._sizeChanged = false;
        if (needRepositioning) {
            renderer.repositionAreas(this);
        }
        return result;
    }
}