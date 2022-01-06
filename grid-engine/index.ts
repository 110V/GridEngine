import Area from "./Area";
import Grid from "./Grid";
import HtmlRenderer from "./HtmlRenderer/HtmlRenderer";
import { Vector2 } from "./Vector2";


export default class GridEngine {
    public mainGrid: Grid;
    private _mainRenderer: HtmlRenderer;

    constructor(x: number, y: number, root: HTMLElement, style: HTMLElement, defaultSize:Vector2) {//TODO Add option interface
        this.mainGrid = new Grid({ x: x, y: y });
        this._mainRenderer = new HtmlRenderer(root, style,defaultSize);
    }

    public render() {
        this._mainRenderer.renderMainGrid(this.mainGrid);
    }

    public exportHTML():string{
        return this._mainRenderer.exportHtml(this.mainGrid);
    }

    public update(target:null|Grid|Area){
        if(!target){
            target = this.mainGrid;
        }
        target.update(this._mainRenderer);
    }
}
