import Content from "../../grid-engine/Content";
import { randomId } from "../../grid-engine/Utils";
import { Vector2 } from "../../grid-engine/Vector2";
import { ColorConfig } from "./ColorConfig";

enum state {
    base,
    on,
    press,
    focused,
}

export default class Block extends Content {
    private _postion: Vector2;
    private _state = new Flu<state>(state.base);
    private _selected: Flu<boolean>;
    public set state(value: state) {
        this._state.set(value);
    }

    constructor(selected: Flu<boolean>, position: Vector2) {
        super(document.createElement("div"));
        const element = this._htmlElement;
        this._selected = selected;
        this._postion = position;

        const set = this._state.register((value) => {
            element.style.backgroundColor = ColorConfig.components.block.color[state[value]];
        });
        this._selected.register((s) => {
            if (s) {
                set(state.focused);
            } else {
                set(state.base);
            }
        });
        //event
        element.addEventListener("mouseenter", () => {
            set(state.on);
        })
        element.addEventListener("mousedown", () => {
            set(state.press);
        })
        element.addEventListener("mouseleave", () => {
            set(state.base);
        })

        //style
        element.style.width = "100%";
        element.style.height = "100%";
    }


}