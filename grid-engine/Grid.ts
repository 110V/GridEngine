import Area from "./Area";
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

    public makeArea(pos: Position, size: Vector2, isWidthFixed: boolean = false, isHeightFiexed: boolean = false, id: string = randomId("area")): Area {
        const newArea = new Area(pos, size, isWidthFixed, isHeightFiexed, id);
        this._newAreas.push(newArea);
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
        for(const area of this._newAreas){
            this._areas[area.id] = area;
            const rendered = area.render(renderer);
            if(rendered){
                renderer.setArea(this, area,rendered);
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