import Area from "./Area";
import BlockSizing from "./HtmlRenderer/BlockSizing";
import HtmlRenderer from "./HtmlRenderer/HtmlRenderer";
import Position from "./Position";
import { randomId } from "./Utils";
import { Vector2 } from "./Vector2";

export default class Grid {
    private _size: Vector2 = { x: 0, y: 0 };
    private _rendered_areas: { [id: string]: Area } = {};
    private _sizeChanged: boolean = false;
    private _newAreas: Area[] = [];
    private _removedAreas: Area[] = [];
    private _id:string;
    
    constructor(size: Vector2,id = randomId("grid")) {
        this._size = size;
        this._id = id;
    }

    public get areas() {
        return Object.values(this._rendered_areas).concat(this._newAreas);
    }
    public get rendered_areas() {
        return Object.values(this._rendered_areas);
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
        return newArea;
    }

    public removeArea(id: string) {
        this._removedAreas.push(this._rendered_areas[id]);
        delete this._rendered_areas[id];
    }

    public area(id: string): Area {
        return this._rendered_areas[id];
    }

    public render(renderer: HtmlRenderer): HTMLElement[] {
        console.log("렌더가 호출되었어요",this.id)
        const a = Date.now();
        let result: HTMLElement[] = [];
        renderer.unloadAreas(this._removedAreas);
        this._removedAreas = [];
        let needRepositioning = false;

        for (const area of this.rendered_areas) {
            needRepositioning = needRepositioning||area.isTransformChanged;
            area.render(renderer);
        }

        if (this._newAreas.length > 0) {
            const blockSizing = new BlockSizing(this);
            for(const area of this._newAreas){
                const rendered = area.render(renderer);
                if(rendered){
                    needRepositioning = true;
                    result.push(rendered);
                    renderer.setArea(blockSizing,area,rendered);
                    this._rendered_areas[area.id] = area;

                }
            }
            this._newAreas = []
        }

        
        needRepositioning = this._sizeChanged||needRepositioning;
        this._sizeChanged = false;
        
        if (needRepositioning) {
            renderer.repositionAreas(this);
        }
        console.log("경과시간",(Date.now() - a)/1000,needRepositioning);
        return result;
    }
}