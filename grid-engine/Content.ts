import Bridge from "./HtmlRenderer/Bridge";
import HtmlRenderer from "./HtmlRenderer/HtmlRenderer";
import { randomId } from "./Utils";

export default class Content {
    protected _id: string = "";
    protected _htmlElement: HTMLElement;;
    protected _isStatic: boolean = false;
    private _initialized: boolean = false;

    public get isStatic() {
        return this._isStatic;
    }
    public get id() {
        return this._id;
    }

    constructor(htmlElement: HTMLElement, id = randomId("content")) {
        this._id = id;
        htmlElement.id = this._id;
        this._htmlElement = htmlElement;
    }

    public init() {
        if (this._initialized)
            return;
        this._initialized = true;
    }

    public render(): HTMLElement {
        this.init();
        return this._htmlElement;
    }
}