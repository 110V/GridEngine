import Area from "./Area";
import Grid from "./Grid";
import Bridge from "./Bridge";
import HtmlRenderer from "./HtmlRenderer/HtmlRenderer";
import { Vector2 } from "./Vector2";
import Content from "./Content";


export default class GridEngine {
    public mainGrid: Grid;
    public bridge:Bridge;
    private _mainRenderer: HtmlRenderer;
    //todo object 만드는 걸 engine쪽에서 처리하도록 하기.?
    //만드는 객체들을 maingrid안쪽이 아니라 엔진 쪽에선 어떻게 처리할찌 생각하기...
    //main grid쪽에서 스캔하는건 좀 이상할것같고...아닌가
    //bridge를 넣을수잇으면되나.? bridge를 넣는것도 이상한가?????
    //content에서만 넣을수잇어야되나 아니면
    //content에다가 컬백을 만들어두고 작동해야하나.
    //content쪽 작동방식을 근데 새로 만들어야하는데
    


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
