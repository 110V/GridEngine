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

  public repositionAreas(grid: Grid) {
    grid.areas.forEach(area => {
      const element = this.getHtmlElementbyId(area.id)
      if (!element) {
        return;
      }
      this._styleManager.areaSetter(grid,area,element);
    });
  }

  public setArea(grid:Grid,area:Area,element:HTMLElement){
      this._styleManager.areaSetter(grid,area,element);
  }

  public unloadAreas(remove:Area[]){
    remove.forEach(area => {
      const element = this.getHtmlElementbyId(area.id);
      if (!element) {
        return;
      }
      element.parentElement?.removeChild(element);
    });
  }

  public getHtmlElementbyId(id: string) {
    let target = document.getElementById(id);
    if(!target){
      target = this._staticElements[id];
    }
    return target;
  }

  public renderArea = (area: Area,child:HTMLElement[]|HTMLElement): HTMLElement => {
    let areaDiv = this.getHtmlElementbyId(area.id);
    if(!areaDiv){
      areaDiv = document.createElement("div");
      areaDiv.id = area.id;
      areaDiv.className = "area";
      if(area.isStatic){
        this._staticElements[area.id] = areaDiv;
      }
    }

    if(child instanceof HTMLElement){
      child = [child];
    }
    if(child.length>0){
      for(let i = 0;i<child.length;i++){
        areaDiv.appendChild(child[i]);
      }
    }
    else{
      while (areaDiv.lastElementChild) {
        areaDiv.removeChild(areaDiv.lastElementChild);
      }
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
