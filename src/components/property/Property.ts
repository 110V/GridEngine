import Content from "../../../grid-engine/Content";
import Grid from "../../../grid-engine/Grid";
import Bridge from "../../../grid-engine/Bridge";
import { randomId } from "../../../grid-engine/Utils";
import Checkbox from "./Checkbox";
import ColorPicker from "./ColorPicker";
import NumberInput from "./NumberInput";
import { Menu, SelectMenu } from "./SelectMenu";
import TextInput from "./TextInput";

enum InputType {
    number,
    color,
    checkbox,
    select,
    text,
}

interface PropertyValue<T> {
    name: string,
    value: T,
    inputType: InputType,
    menus?: Menu[],
    outputLogic:string
}


class PropertyEdit extends Grid {
    private _name: string;
    private _values: PropertyValue<any>[];
    private _bridge:Bridge;
    constructor(name: string, values: PropertyValue<any>[],bridge:Bridge) {
        super({ x: 2, y: values.length + 1 });
        this._name = name;
        this._values = values;
        this._bridge = bridge;
        this.Init();
    };

    private Init() {
        const area_propertyName = this.makeArea({ x: 0, y: 0 }, { x: 2, y: 1 }, false, false);
        const element_name = document.createElement("div");
        element_name.innerText = this._name;
        element_name.className = "propertyname"
        area_propertyName.setChild(new Content(element_name));
        this._values.forEach((v, i) => {
            const area_value = this.makeArea({ x: 0, y: i + 1 }, { x: 2, y: 1 }, false, false);
            switch (v.inputType) {
                case InputType.number: {
                    const content_number = new NumberInput(randomId("number"),v.name,v.outputLogic,this._bridge);
                    area_value.setChild(content_number);
                    break;
                }
                case InputType.color: {
                    const content_color = new ColorPicker(randomId("color"),v.name,v.outputLogic,this._bridge);
                    area_value.setChild(content_color);
                    break;
                }
                case InputType.checkbox: {
                    const content_checkbox = new Checkbox(randomId("checkbox"),v.name,v.outputLogic,this._bridge);
                    area_value.setChild(content_checkbox);
                    break;
                }
                case InputType.select: {
                    if (!v.menus)
                        break;
                    const content_select = new SelectMenu(v.name, v.menus,v.outputLogic,this._bridge);
                    area_value.setChild(content_select);
                    break;
                }
                case InputType.text: {
                    const content_text = new TextInput(v.name);
                    area_value.setChild(content_text);
                    break;
                }
            }
        });
    }

}


export { InputType, PropertyEdit, PropertyValue };