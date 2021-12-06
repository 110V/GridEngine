import Area from "./Area";
import Grid from "./Grid";
import HtmlRenderer from "./HtmlRenderer/HtmlRenderer";
import { Vector2 } from "./Vector2";


export default class GridEngine {
    public mainGrid: Grid;
    public mainRenderer: HtmlRenderer;

    constructor(x: number, y: number, root: HTMLElement, style: HTMLElement, defaultSize:Vector2) {//TODO Add option interface
        this.mainGrid = new Grid({ x: x, y: y });
        this.mainRenderer = new HtmlRenderer(root, style,defaultSize);
    }

    public render(root: HTMLElement, style: HTMLElement) {
        this.mainRenderer.render(this.mainGrid);
    }

    //TODO rendersetting
    //TODO 옵션에 따른 mainArea 그리드 세팅
}
