import Grid from "../../grid-engine/Grid";
import Bridge from "../../grid-engine/Bridge";
import { InputType, PropertyEdit } from "./property/Property";

class CssEditor extends Grid {

    constructor(bridge:Bridge) {
        super({ x: 1, y: 30 })
        
        const sizeProperties = new PropertyEdit("Size", [
            { name: "Width", value: "100%", inputType: InputType.text,outputLogic:"css_size_width_setter"},
            { name: "Height", value: "100%", inputType: InputType.text,outputLogic:"css_size_height_setter"},
        ],bridge);

        const borderProperties = new PropertyEdit("Border", [
            { name: "Color", value: "#FFFFFF", inputType: InputType.color,outputLogic:"css_border_color_setter" },
            { name: "Thickness (px)", value: "3", inputType: InputType.number,outputLogic:"css_border_thickness_setter" },
        ],bridge);

        const shadowProperties = new PropertyEdit("Shadow", [
            { name: "Inset", value: false, inputType: InputType.checkbox,outputLogic:"css_shadow_inset_setter" },
            { name: "Y offset (px)", value: 10, inputType: InputType.number,outputLogic:"css_shadow_yoffset_setter" },
            { name: "X offset (px)", value: 10, inputType: InputType.number,outputLogic:"css_shadow_xoffset_setter" },
            { name: "Blur", value: 10, inputType: InputType.number,outputLogic:"css_shadow_blur_setter" },
        ],bridge);

        const cursorProperties = new PropertyEdit("Cursor", [
            {
                name: "Type", value: 0, inputType: InputType.select, menus: [
                    { key: "Pointer", value: "pointer" },
                    { key: "Wait", value: "wait" },
                    { key: "Colum resize", value: "col-resize" },
                    { key: "Row resize", value: "row-resize" }],
                    outputLogic:"css_cursor_type_setter"
            },
        ],bridge);

        const textAlignProperties = new PropertyEdit("Text", [
            {
                name: "Text Align", value: 0, inputType: InputType.select, menus: [
                    { key: "Left", value: "left" },
                    { key: "Center", value: "center" },
                    { key: "right", value: "right" }
                ],outputLogic:"css_text_align_setter"
            }
        ],bridge);

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