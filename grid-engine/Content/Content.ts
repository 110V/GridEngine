import Bridge from "../Bridge";
import HtmlRenderer from "../HtmlRenderer/HtmlRenderer";
import { randomId } from "../Utils";
import { render, update, VirtualElement } from "./Vdom";

export default class Content {
    protected _id: string = "";
    protected _htmlElement: HTMLElement|null = null;
    protected _isStatic: boolean = false;
    private _render:(()=>VirtualElement)|null = null;
    private prevRender:VirtualElement|null = null;
    
    constructor(id = randomId("content"), render:(()=>VirtualElement)|null = null) {
        this._id = id;
        this._render = render;
    }

    public get isStatic() {
        return this._isStatic;
    }
    public get id() {
        return this._id;
    }

    public render(): HTMLElement {
        if(this._render){
            const rendered = this._render();
            if(!this._htmlElement){
                return render(rendered);
            }
            
            update(rendered,this.prevRender,this._htmlElement);
        }
        else{
            return document.createElement("div");
        }
        return this._htmlElement;
    }
}