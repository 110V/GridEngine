import Grid from "../../grid-engine/Grid";
import { InputType, PropertyEdit } from "./property/Property";

class CssEditor extends Grid {

    constructor() {
        super({ x: 1, y: 30 })
        const sizeProperties = new PropertyEdit("Size", [
            { name: "Width", value: "100%", inputType: InputType.text },
            { name: "Height", value: "100%", inputType: InputType.text },
        ]);
        const borderProperties = new PropertyEdit("Border", [
            { name: "Color", value: "#FFFFFF", inputType: InputType.color },
            { name: "Thickness (px)", value: "3", inputType: InputType.number },
        ]);
        const shadowProperties = new PropertyEdit("Shadow", [
            { name: "Inset", value: false, inputType: InputType.checkbox },
            { name: "Y offset (px)", value: 10, inputType: InputType.number },
            { name: "X offset (px)", value: 10, inputType: InputType.number },
            { name: "Blur", value: 10, inputType: InputType.number },
        ]);
        const cursorProperties = new PropertyEdit("Cursor", [
            {
                name: "Type", value: 0, inputType: InputType.select, menus: [
                    { key: "Pointer", value: "pointer" },
                    { key: "Wait", value: "wait" },
                    { key: "Colum resize", value: "col-resize" },
                    { key: "Row resize", value: "row-resize" }]
            },
        ]);
        const textAlignProperties = new PropertyEdit("Text", [
            {
                name: "Text Align", value: 0, inputType: InputType.select, menus: [
                    { key: "Left", value: "left" },
                    { key: "Center", value: "center" },
                    { key: "right", value: "right" }
                ]
            }
        ]);
        const sizeGrid = this.makeArea({ x: 0, y: 1 }, { x: 1, y: 3 }, false, true);
        const borderGrid = this.makeArea({ x: 0, y: 5 }, { x: 1, y: 3 }, false, true);
        const shadowGrid = this.makeArea({ x: 0, y: 9 }, { x: 1, y: 5 }, false, true);
        const cursorGrid = this.makeArea({ x: 0, y: 15 }, { x: 1, y: 2 }, false, true);
        const textAlignGrid = this.makeArea({ x: 0, y: 18 }, { x: 1, y: 2 }, false, true);

        sizeGrid.setChild(sizeProperties);
        borderGrid.setChild(borderProperties);
        shadowGrid.setChild(shadowProperties);
        cursorGrid.setChild(cursorProperties);
        textAlignGrid.setChild(textAlignProperties);
    }
}

export { CssEditor }