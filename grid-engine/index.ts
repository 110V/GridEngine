import Area from "./Area";
import Grid from "./Grid";
import HtmlRenderer from "./StaticRenderer/StaticRenderer";
import Renderer from "./Renderer";


export default class GridEngine {
    public mainGrid: Grid;
    public mainRenderer:HtmlRenderer = new HtmlRenderer();

    constructor(x: number, y: number) {//TODO Add option interface
        this.mainGrid = new Grid({ x: x, y: y });
    }

    public render(width: number, height: number): string {
        return this.mainRenderer.render(this.mainGrid);
    }

    //TODO rendersetting
    //TODO 옵션에 따른 mainArea 그리드 세팅
}
