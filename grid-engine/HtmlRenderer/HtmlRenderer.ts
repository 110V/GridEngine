import Area from "../Area";
import Content from "../Content";
import Grid from "../Grid";
import { Vector2 } from "../Vector2";
import BlockSizing from "./BlockSizing";
import StyleManager from "./StyleManager";



export default class HtmlRenderer {
  private _styleManager: StyleManager;
  private _root:HTMLElement;
  private _style:HTMLElement

  constructor(root:HTMLElement,style:HTMLElement,defaultSize:Vector2){
    this._root = root;
    this._style = style;
    this._styleManager = new StyleManager(defaultSize);
  }

  public render(mainGrid: Grid) {
    const html = this.renderGrid(mainGrid);
    const css = this._styleManager.exportCss();
    this._styleManager.initRootElement(this._root);
    
    for(let i = 0;i<html.length;i++){
      this._root.appendChild(html[i]);
    }
    this._style.innerHTML = css;
  }
  
  public renderGrid = (grid: Grid): HTMLElement[] => {
    let result: HTMLElement[] = []
    grid.areas.forEach((area) => {
      const id = area.id;
      const rendered = area.render(this);
      if (rendered) {
        this._styleManager.areaSetter(grid, area, rendered);
        result.push(rendered);
      }
    });

    return result;
  }

  public renderArea = (area: Area): HTMLElement|null => {
    const id = area.id;
    let result:HTMLElement[];
    if (!area.child) {
      return null;
    }
    else if (area.child instanceof Grid) {
      result = area.child.renderSubjects(this);
    }
    else {//area instance of Element
      result = [(area.child as Content).render(this)];
    }

    const areaDiv = document.createElement("div");
    areaDiv.id = id;
    areaDiv.className = "area";
    for(let i = 0;i<result.length;i++){
      areaDiv.appendChild(result[i]);
    }
    return areaDiv;
  }

  public exportHtml(mainGrid:Grid):string{
    const html = this.renderGrid(mainGrid);
    const css = this._styleManager.exportCss()
    for(let i = 0;i<html.length;i++){
      this._root.appendChild(html[i]);
    }
    this._style.innerHTML = css;
    return html.toString();
  }

}
