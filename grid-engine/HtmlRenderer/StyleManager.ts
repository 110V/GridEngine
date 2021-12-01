import Area from "../Area";
import Content from "../Content";
import Position from "../Position";
import Vector2 from "../Vector2";

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

    private contentSetter() {
        //TODO
    }

    private makePosProperty(gridSize: Vector2, position: Position): Property[] {
        const gridWidth = 100 / gridSize.x;
        const gridHeight = 100 / gridSize.y;

        const posX = gridWidth * position.x;
        const posY = gridHeight * position.y;
        const posXProperty: Property = { name: "left", value: `${posX}%` };
        const posYProperty: Property = { name: "top", value: `${posY}%` };
        const posZProperty: Property = { name: "z-index", value: position.z.toString() }
        return [posXProperty, posYProperty, posZProperty];
    }

    public areaSetter(gridSize: Vector2, area: Area, id: string) {
        const gridWidth = 100 / gridSize.x;
        const gridHeight = 100 / gridSize.y;

        const width = gridWidth * area.size.x;
        const height = gridHeight * area.size.y;
        const widthProperty: Property = { name: "width", value: `${width}%` };
        const heightPropety: Property = { name: "height", value: `${height}%` };

        const posProperty = this.makePosProperty(gridSize, area.position);

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
//TODO move to main engine class

        let result: string = ``;

        for (const [key, value] of Object.entries(this._styles)) {
            result += `#${key} {\n${value.map((property) => `    ${property.name}: ${property.value};`).join("\n")}\n}`;
        }
        return this.basicCSS + result;
    }
}
