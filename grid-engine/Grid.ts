import Area from "./Area";
import Flu from "./Flu";
import Position from "./Position";
import Renderer from "./Renderer";
import { randomId } from "./Utils";
import Vector2 from "./Vector2"


export default class Grid {
    private _id: string;
    private _size: Vector2 = { x: 0, y: 0 };
    private _areas: Area[] = [];

    constructor(size: Vector2) {
        this._size = size;
        this._id = randomId("grid");
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

    public makeArea(position: Position, size: Vector2): Area {
        const newArea = new Area(position, size)
        this._areas.push(newArea);
        return newArea;
    }

    public area(position: Position): Area | null {
        let area: Area | null = null;
        this.areas.forEach((a) => {
            if (a.size) {
                area = a;
            }
        })
        return area;
    }

    public renderSubjects(renderer: Renderer): string {
        return renderer.renderGrid(this)
    }
}