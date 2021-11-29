import Area from "../Area";
import Content from "../Content";
import Text from "../Content/Text";
import Grid from "../Grid";
import Renderer from "../Renderer";
import StyleManager from "./StyleManager";



export default class StaticRenderer extends Renderer {
  private styleManager: StyleManager = new StyleManager();

  public render(mainGrid: Grid): string {
    const html = this.renderGrid(mainGrid);
    const css = this.styleManager.exportStyle()
    const result = JSON.stringify({html:html,css:css});

    return result;
  }

  public renderGrid = (grid: Grid): string => {
    const result = grid.areas.map((area) => {

      const id = area.id;
      this.styleManager.areaSetter(grid.size, area, id);
      return area.render(this);
    });

    return result.join('\n');
  }

  public renderArea = (area: Area): string => {
    const id = area.id;
    let result:string;
    if (!area.child) {
      return "";
    }
    else if (area.child instanceof Grid) {
      result = area.child.renderSubjects(this);
    }
    else {//area instance of Element
      result = (area.child as Content).render(this);
    }
    return `<div id="${id}" class="absolute">` + result + "</div>"
  }

  public renderText(text: Text) {
    return `<div>${text.value}</div>`;
  }
}
