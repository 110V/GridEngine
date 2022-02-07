import Bridge from "../Bridge";
import HtmlRenderer from "../HtmlRenderer/HtmlRenderer";
import { randomId } from "../Utils";
import { render, update, VirtualElement } from "./Vdom";

export default class Content {
    protected _id: string = "";
    protected _htmlElement: HTMLElement|null = null;
    protected _isStatic: boolean = false;
    protected _render:(()=>VirtualElement)|null = null;
    protected _bridge: Bridge;
    private prevRender:VirtualElement|null = null;
    
    constructor(bridge:Bridge,id = randomId("content"), render:(()=>VirtualElement)|null = null) {
        this._bridge = bridge;
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
                this._htmlElement = render(rendered);
                console.log(this._htmlElement);
                return this._htmlElement;
            }
            
            update(rendered,this.prevRender,this._htmlElement);
        }
        else{
            return document.createElement("div");
        }
        return this._htmlElement;
    }
}