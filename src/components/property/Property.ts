import Content from "../../../grid-engine/Content";
import Grid from "../../../grid-engine/Grid";
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
    menus?: Menu[]
}


class PropertyEdit extends Grid {
    private _name: string;
    private _values: PropertyValue<any>[];

    constructor(name: string, values: PropertyValue<any>[]) {
        super({ x: 2, y: values.length + 1 });
        this._name = name;
        this._values = values;
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
                    const flu = new Flu<number>(v.value);
                    const content_number = new NumberInput(v.name, flu);
                    area_value.setChild(content_number);
                    break;
                }
                case InputType.color: {
                    const flu = new Flu<string>(v.value);
                    const content_color = new ColorPicker(v.name, flu);
                    area_value.setChild(content_color);
                    break;
                }
                case InputType.checkbox: {
                    const flu = new Flu<boolean>(v.value);
                    const content_checkbox = new Checkbox(v.name, flu);
                    area_value.setChild(content_checkbox);
                    break;
                }
                case InputType.select: {
                    const flu = new Flu<string>(v.value);
                    if (!v.menus)
                        break;
                    const content_select = new SelectMenu(v.name, flu, v.menus);
                    area_value.setChild(content_select);
                    break;
                }
                case InputType.text: {
                    const flu = new Flu<string>(v.value);
                    const content_text = new TextInput(v.name, flu);
                    area_value.setChild(content_text);
                    break;
                }
            }
        });
    }

}


export { InputType, PropertyEdit, PropertyValue };