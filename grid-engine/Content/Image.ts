import Content from "../Content";
import Renderer from "../Renderer";

export default class Image extends Content {

    public render(renderer:Renderer){
        return "image";
    }
}