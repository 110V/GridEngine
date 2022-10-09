import Area from "../Area";
import Content from "../Content/Content";
import Grid from "../Grid";
import Position from "../Position";
import { Vector2 } from "../Vector2";
import BlockSizing from "./BlockSizing";


interface Property {
    name: string,
    value: string,
}

export default class StyleManager {
    private _styles: { [key: string]: Property[] } = {};
    // private makePosProperty(grid:Grid, area:Area): Property[] {
    //     const blockSizing = new BlockSizing(grid,this._defaultSize); 
    //     const posXProperty: Property = { name: "left", value: blockSizing.makePosXCSS(area) };
    //     const posYProperty: Property = { name: "top", value: blockSizing.makePosYCSS(area) };
    //     return [posXProperty, posYProperty]
    // }

    public areaSetter(blockSizing:BlockSizing, area: Area, div:HTMLElement) {
        div.style.width = blockSizing.makeAreaWidthCSS(area);
        div.style.height = blockSizing.makeAreaHeightCSS(area);
        div.style.left = blockSizing.makePosXCSS(area);
        div.style.top = blockSizing.makePosYCSS(area);
        div.style.position = "absolute";
    }

    private addStyle(target: string, name: string, value: string) {
        this.addStyles(target, [{ name: name, value: value }]);
    }

    private addStyles(target: string, properties: Property[]) {
        if (this._styles[target] == undefined) {
            this._styles[target] = [];
        }
        this._styles[target].push(...properties);
    }

    //use for media query
    public exportCss(): string {
        let result: string = ``;

        for (const [key, value] of Object.entries(this._styles)) {
            result += `#${key} {\n${value.map((property) => `    ${this.makeStyle(property)}`).join("\n")}\n}`;
        }
        return result;
    }

    public makeStyle(property:Property): string {
        return `${property.name}: ${property.value};`;
    }

    public initRootElement(root:HTMLElement){
        root.style.position = "relative";
    }
}
