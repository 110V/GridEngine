import Area from "./Area";
import Grid from "./Grid";
import Bridge from "./Bridge";
import HtmlRenderer from "./HtmlRenderer/HtmlRenderer";
import { Vector2 } from "./Vector2";
import Content from "./Content/Content";


export default class GridEngine {
    public mainGrid: Grid;
    public bridge:Bridge;
    private _mainRenderer: HtmlRenderer;


    constructor(x: number, y: number, root: HTMLElement, style: HTMLElement, defaultSize:Vector2) {//TODO Add option interface
        this.mainGrid = new Grid({ x: x, y: y });
        this._mainRenderer = new HtmlRenderer(root, style,defaultSize);
        this.bridge = new Bridge();
    }
    
    public render() {
        this._mainRenderer.renderMainGrid(this.mainGrid);
    }

    public exportHTML():string{
        return this._mainRenderer.exportHtml(this.mainGrid);
    }

    public addObjectToBridge(object:Grid|Content|Area,containChilds:boolean){
        this.bridge.addObject(object);
        if(!containChilds||object instanceof Content){
            return;
        }
        const findChilds = (object:Grid)=>{
            object.areas.forEach(area=>{
                this.bridge.addObject(area);
                if(!area.child){
                    return;
                }
                this.bridge.addObject(area.child);
                if(area.child instanceof Grid){
                    findChilds(area.child);
                }
            });
        }
        if(object instanceof Grid){
            findChilds(object);
        }else if (object instanceof Area){
            if(object.child instanceof Grid){
                findChilds(object.child);
            }
        }
    }
}
