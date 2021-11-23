import Renderer from "./Renderer";

export default abstract class Content {
    public render(renderer:Renderer):string{
        return "test";
    }
}