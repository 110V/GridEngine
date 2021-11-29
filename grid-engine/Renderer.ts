import Area from "./Area";
import Content from "./Content";
import Image from "./Content/Image";
import Text from "./Content/Text";
import Grid from "./Grid";
import { randomId } from "./Utils";

//TODO make to abstract class
export default abstract class Renderer {

  public renderGrid(grid: Grid): any {

  }

  public renderArea = (area: Area): any => {

  }

  public renderText(text: Text): any {

  }

  public renderImage(image: Image): any {

  }
}
