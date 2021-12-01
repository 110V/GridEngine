import Flu from "./Flu";
import HtmlRenderer from "./HtmlRenderer/HtmlRenderer";
import { randomId } from "./Utils";

export default class Content {
    private _id:string = "";
    private _htmlCreator:(flues: Flu<any>[]) => HTMLElement;
    private _Flus:Flu<any>[];

    constructor(htmlCreator:(flues: Flu<any>[]) => HTMLElement,flus:Flu<any>[]){
        this._id = randomId("content");
        this._Flus = flus;
        this._htmlCreator = htmlCreator;
    }

    public get flus(){
        return this._Flus;
    }

    public render(renderer:HtmlRenderer):HTMLElement{
        return this._htmlCreator(this._Flus);
    }
}