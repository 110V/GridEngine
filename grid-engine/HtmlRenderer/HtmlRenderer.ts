import Area from "../Area";
import Content from "../Content";
import Text from "../Content/Text";
import Grid from "../Grid";
import Renderer from "../Renderer";
import { randomId } from "../Utils";

//TODO make to abstract class
export default class HtmlRenderer extends Renderer {

  public render(mainGrid:Grid): string {
    return this.renderGrid(mainGrid);
  }

  public renderGrid(grid: Grid): string {
    const result = grid.areas.map(this.renderArea);
    return result.join('\n');
  }

  public renderArea = (area: Area): string => {
    if (area.child == undefined) {
      return "";
    }
    else if (area.child instanceof Grid){
      const result = this.renderGrid(area.child);
      return result;
    }
    else{//area instance of Element
      console.log("test"+this);
      const result  = (area.child as Content).render(this);
      return result;
    }
  }

  public renderText(text: Text) {
    return `<div>${text.value}</div>`;
  }
}
