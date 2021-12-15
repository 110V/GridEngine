import Area from "./Area";
import Flu from "./Flu";
import HtmlRenderer from "./HtmlRenderer/HtmlRenderer";
import Position from "./Position";
import { randomId } from "./Utils";
import { Vector2 } from "./Vector2";


export default class Grid {
    private _rendered = false;
    private _size: Vector2 = { x: 0, y: 0 };
    private _areas: Area[] = [];

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
        //TODO flu
    }

    public makeArea(position: Position, size: Vector2,isWidthFixed:boolean = false,isHeightFiexed:boolean = false,id:string=randomId("area")): Area {
        const newArea = new Area(position, size,isWidthFixed,isHeightFiexed,id);
        this._areas.push(newArea);
        return newArea;
    }

    public area(position: Position): Area[] {
        let areas: Area[] = [];
        this.areas.forEach((a) => {
            if (a.position == position) {
                areas.push(a);
            }
        })
        return areas;
    }

    public render(renderer: HtmlRenderer): HTMLElement[] {
        this._rendered = true;
        return renderer.renderGrid(this)
    }

    public update(renderer: HtmlRenderer): HTMLElement[] {
        if (!this._rendered) {
            return this.render(renderer);
        }
        return renderer.updateGrid(this)
    }
}