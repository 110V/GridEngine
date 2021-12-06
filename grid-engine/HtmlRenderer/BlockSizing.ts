import Area from "../Area";
import Grid from "../Grid";
import { Vector2 } from "../Vector2";


export default class BlockSizing {
    private _grid: Grid;
    private _defaultSize: Vector2;
    private _fixedBlockWH: Vector2;

    constructor(grid: Grid, defaultSize: Vector2) {
        this._grid = grid;
        this._defaultSize = defaultSize;
        this._fixedBlockWH = { x: defaultSize.x / grid.size.x, y: defaultSize.y / grid.size.y };
    }

    public calculateFlexibleBlockHeight(area: Area,areaHeight:number):number {
        if (area.isFixedHeight) {
            return area.size.y * this._fixedBlockWH.y;
        }
        let fixedBlockCount = 0;
        this._grid.areas.forEach((a) => {
            if (a.checkColumnInArea(area.position.x)) {
                fixedBlockCount += a.size.y;
            };
        })

        const leftBlockCount = this._grid.size.x - fixedBlockCount;
        const flexibleBlockSize = (areaHeight-fixedBlockCount * this._fixedBlockWH.x) / leftBlockCount;
        return flexibleBlockSize;
    }

    public calculateHeight(area: Area,areaHeight:number):number {
        if (area.isFixedHeight) {
            return area.size.y * this._fixedBlockWH.y;
        }
        return this.calculateFlexibleBlockHeight(area,areaHeight)*area.size.y;
    }

    public calculateFlexibleBlockWidth(area: Area, areaWidth:number): number {
        if (area.isFixedWidth) {
            return area.size.x * this._fixedBlockWH.x;
        }
        let fixedBlockCount = 0;
        this._grid.areas.forEach((a) => {
            if (a.checkRowInArea(area.position.y)) {
                fixedBlockCount += a.size.x;
            };
        })

        const leftBlockCount = this._grid.size.x - fixedBlockCount;
        const flexibleBlockSize = (areaWidth-fixedBlockCount * this._fixedBlockWH.x) / leftBlockCount;
        return area.size.x * flexibleBlockSize;
    }

    public calculateWidth(area: Area, areaWidth:number): number {
        if (area.isFixedWidth) {
            return area.size.x * this._fixedBlockWH.x;
        }
        return this.calculateFlexibleBlockWidth(area,areaWidth)*area.size.x;
    }

    public makeOneFlexBlockWidthCSS(area: Area) : string {
        let fixedBlockCount = 0;
        this._grid.areas.forEach((a) => {
            if (a.checkRowInArea(area.position.y)) {
                fixedBlockCount += a.size.x;
            };
        })

        const leftBlockCount = this._grid.size.x - fixedBlockCount;
        return `calc(${100/leftBlockCount}% - ${fixedBlockCount * this._fixedBlockWH.x / leftBlockCount}px)`;
    }


    public makeAreaWidthCSS(area: Area) : string {
        if (area.isFixedWidth) {
            return `${area.size.x * this._fixedBlockWH.x}px`;
        }

        let fixedBlockCount = 0;
        this._grid.areas.forEach((a) => {
            if (a.checkRowInArea(area.position.y)) {
                fixedBlockCount += a.size.x;
            };
        })

        const leftBlockCount = this._grid.size.x - fixedBlockCount;
        return `calc(${100/leftBlockCount*area.size.x}% - ${fixedBlockCount * this._fixedBlockWH.x / leftBlockCount * area.size.x}px)`;
    }

    public makeOneFlexBlockHeightCSS(area: Area) : string {
        let fixedBlockCount = 0;
        this._grid.areas.forEach((a) => {
            if (a.checkColumnInArea(area.position.x)) {
                fixedBlockCount += a.size.y;
            };
        })

        const leftBlockCount = this._grid.size.x - fixedBlockCount;
        return `calc(${100/leftBlockCount}% - ${fixedBlockCount * this._fixedBlockWH.y / leftBlockCount}px)`;
    }

    public makeAreaHeightCSS(area: Area) : string {
        if (area.isFixedHeight) {
            return `${area.size.y * this._fixedBlockWH.y}px`;
        }

        let fixedBlockCount = 0;
        this._grid.areas.forEach((a) => {
            if (a.checkColumnInArea(area.position.x)) {
                fixedBlockCount += a.size.y;
            };
        })

        const leftBlockCount = this._grid.size.x - fixedBlockCount;
        return `calc(${100/leftBlockCount*area.size.y}% - ${fixedBlockCount * this._fixedBlockWH.y / leftBlockCount * area.size.y}px)`;
    }

    public calculatePosX(area: Area, areaWidth:number): number {
        let fixedBlockCount = 0;
        this._grid.areas.forEach((a) => {
            if (area.position.x>a.position.x&&a.checkRowInArea(area.position.y)) {
                fixedBlockCount += a.size.x;
            };
        })

        const flexBlockCount = this._grid.size.x - fixedBlockCount;
        const flexibleBlockSize = this.calculateFlexibleBlockWidth(area,areaWidth);
        return flexBlockCount*flexibleBlockSize + fixedBlockCount*this._fixedBlockWH.x;
    }

    public calculatePosY(area: Area, areaWidth:number): number {
        let fixedBlockCount = 0;
        this._grid.areas.forEach((a) => {
            if (area.position.y>a.position.y&&a.checkColumnInArea(area.position.y)) {
                fixedBlockCount += a.size.y;
            };
        })

        const flexBlockCount = this._grid.size.y - fixedBlockCount;
        const flexibleBlockSize = this.calculateFlexibleBlockWidth(area,areaWidth);
        return flexBlockCount*flexibleBlockSize + fixedBlockCount*this._fixedBlockWH.y;
    }

    public makePosXCSS(area: Area): string {
        let fixedBlockCount = 0;
        this._grid.areas.forEach((a) => {
            if (area.position.x>a.position.x&&a.checkRowInArea(area.position.y)) {
                fixedBlockCount += a.size.x;
            };
        })

        const flexBlockCount = area.position.x - fixedBlockCount;
        const oneFlexBlockWidth = this.makeOneFlexBlockWidthCSS(area);

        const fixedBlocksWidth = fixedBlockCount * this._fixedBlockWH.x
        return `calc(${fixedBlocksWidth}px + calc(${oneFlexBlockWidth} * ${flexBlockCount}))`;
    }

    public makePosYCSS(area: Area): string {
        let fixedBlockCount = 0;
        this._grid.areas.forEach((a) => {
            if (area.position.y>a.position.y&&a.checkRowInArea(area.position.y)) {
                fixedBlockCount += a.size.y;
            };
        })

        const flexBlockCount = area.position.y - fixedBlockCount;
        const oneFlexBlockHeight = this.makeOneFlexBlockHeightCSS(area);

        const fixedBlocksHeight = fixedBlockCount * this._fixedBlockWH.y
        return `calc(${fixedBlocksHeight}px + calc(${oneFlexBlockHeight} * ${flexBlockCount}))`;
    }
}