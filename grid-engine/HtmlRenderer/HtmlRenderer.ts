import Area from "../Area";
import Content from "../Content";
import Grid from "../Grid";
import StyleManager from "./StyleManager";



export default class HtmlRenderer {
  private styleManager: StyleManager = new StyleManager();
  private _root:HTMLElement;
  private _style:HTMLElement

  constructor(root:HTMLElement,style:HTMLElement){
    this._root = root;
    this._style = style;
  }

  public render(mainGrid: Grid) {
    const html = this.renderGrid(mainGrid);
    const css = this.styleManager.exportStyle()
    for(let i = 0;i<html.length;i++){
      this._root.appendChild(html[i]);
    }
    this._style.innerHTML = css;
  }
  
  public renderGrid = (grid: Grid): HTMLElement[] => {
    let result: HTMLElement[] = []
    grid.areas.forEach((area) => {
      const id = area.id;
      this.styleManager.areaSetter(grid.size, area, id);
      const rendered = area.render(this);
      if (rendered) {
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

}
