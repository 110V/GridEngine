import Area from "../Area";
import Content from "../Content";
import Grid from "../Grid";
import { Vector2 } from "../Vector2";
import BlockSizing from "./BlockSizing";
import StyleManager from "./StyleManager";



export default class HtmlRenderer {
  private _styleManager: StyleManager;
  private _root: HTMLElement;
  private _style: HTMLElement
  private _staticElements: {[id:string]:HTMLElement} = {};

  constructor(root: HTMLElement, style: HTMLElement, defaultSize: Vector2) {
    this._root = root;
    this._style = style;
    this._styleManager = new StyleManager(defaultSize);
  }

  public renderMainGrid = (mainGrid: Grid) => {
    const html = mainGrid.render(this);
    const css = this._styleManager.exportCss();
    this._styleManager.initRootElement(this._root);

    for (let i = 0; i < html.length; i++) {
      this._root.appendChild(html[i]);
    }
    this._style.innerHTML = css;
  }

  public renderGrid = (grid: Grid, sizeChanged: boolean, changedAreas: Area[]): HTMLElement[] => {
    let newElements: HTMLElement[] = [];

    for(let area of changedAreas) {
      let htmlElement = this.getHtmlElementbyId(area.id);
      if(htmlElement){
        htmlElement.parentElement?.removeChild(htmlElement);
      }
      else{
        htmlElement = area.render(this);
        this._styleManager.areaSetter(grid, area, htmlElement);
        newElements.push(htmlElement);
      }
    }

    if (sizeChanged) {
      for (let area of grid.areas) {
        const htmlElement = this.getHtmlElementbyId(area.id);
        if (!htmlElement) {
          continue;
        }
        this._styleManager.areaSetter(grid, area, htmlElement);
      }
    }

    return newElements;
  }

  public getHtmlElementbyId(id: string) {
    let target = document.getElementById(id);
    if(!target){
      target = this._staticElements[id];
    }
    return target;
  }

  public renderArea = (area: Area): HTMLElement => {
    let areaDiv = this.getHtmlElementbyId(area.id);

    if(!areaDiv){
      areaDiv = document.createElement("div");
      areaDiv.id = area.id;
      areaDiv.className = "area";
      if(area.isStatic){
        this._staticElements[area.id] = areaDiv;
      }
    }

    let result: HTMLElement[];

    if (!area.child) {
      return areaDiv;
    }
    else if (area.child instanceof Grid) {
      result = area.child.render(this);
    }
    else {//area instance of Element
      result = [(area.child as Content).render()];
    }

    for (let i = 0; i < result.length; i++) {
      areaDiv.appendChild(result[i]);
    }

    return areaDiv;
  }

  public exportHtml = (mainGrid: Grid): string => {
    const html = mainGrid.render(this);
    const css = this._styleManager.exportCss()
    for (let i = 0; i < html.length; i++) {
      this._root.appendChild(html[i]);
    }
    this._style.innerHTML = css;
    return html.toString();
  }

}
