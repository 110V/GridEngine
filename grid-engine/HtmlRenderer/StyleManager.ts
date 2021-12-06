import Area from "../Area";
import Content from "../Content";
import Grid from "../Grid";
import Position from "../Position";
import { Vector2 } from "../Vector2";
import BlockSizing from "./BlockSizing";


interface Property {
    name: string,
    value: string,
}

export default class StyleManager {
    private basicCSS =
        `.root {
            position: relative;
        }

        .area {
            position: absolute;
        }\n`
        
    private _styles: { [key: string]: Property[] } = {};
    private _defaultSize:Vector2;
    constructor(defaultSize:Vector2){
        this._defaultSize = defaultSize;
    }

    private makePosProperty(grid:Grid, area:Area): Property[] {
        const blockSizing = new BlockSizing(grid,this._defaultSize); 
        const posXProperty: Property = { name: "left", value: blockSizing.makePosXCSS(area) };
        const posYProperty: Property = { name: "top", value: blockSizing.makePosYCSS(area) };
        return [posXProperty, posYProperty]
    }

    public areaSetter(grid:Grid, area: Area, id: string) {
        const blockSizing = new BlockSizing(grid,this._defaultSize); 

        const widthProperty: Property = { name: "width", value: blockSizing.makeAreaWidthCSS(area) };
        const heightPropety: Property = { name: "height", value: blockSizing.makeAreaHeightCSS(area) };

        const posProperty = this.makePosProperty(grid,area);

        this.addStyles(id, [widthProperty, heightPropety, ...posProperty]);
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


    public exportStyle(): string {
        let result: string = ``;

        for (const [key, value] of Object.entries(this._styles)) {
            result += `#${key} {\n${value.map((property) => `    ${property.name}: ${property.value};`).join("\n")}\n}`;
        }
        return this.basicCSS + result;
    }
}
