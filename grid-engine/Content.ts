import Flu from "./Flu";
import HtmlRenderer from "./HtmlRenderer/HtmlRenderer";
import { randomId } from "./Utils";

export default class Content {
    protected _id:string = "";
    protected _htmlElement: HTMLElement;;

    public get id(){
        return this._id;
    }

    constructor(htmlElement:HTMLElement,id = randomId("content")){
        this._id = id;
        htmlElement.id = this._id;
        this._htmlElement = htmlElement;
    }

    public render(renderer:HtmlRenderer):HTMLElement{
        return this._htmlElement;
    }
}