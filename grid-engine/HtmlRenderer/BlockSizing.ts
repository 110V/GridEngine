import Area from "../Area";
import Grid from "../Grid";
import { Vector2 } from "../Vector2";


export default class BlockSizing {
    private _grid: Grid;
    private _defaultSize: Vector2;
    private _fixedBlockWH: Vector2;
    private _fixedColumn = new Set<number>();;
    private _fixedRow = new Set<number>();
    
    constructor(grid: Grid, defaultSize: Vector2) {
        this._grid = grid;
        this._defaultSize = defaultSize;
        this._fixedBlockWH = { x: defaultSize.x / grid.size.x, y: defaultSize.y / grid.size.y };

        this.updateFixedLines();
    }

    private updateFixedLines() {
        this._grid.areas.forEach(area => {
            if(area.isFixedWidth) {
                for(let i = area.position.x; i<=area.position.x+area.size.x;i++){
                    this._fixedColumn.add(i);
                }
            }
            if(area.isFixedHeight) {
                for(let i = area.position.y; i<=area.position.y+area.size.y;i++){
                    this._fixedRow.add(i);
                }
            }
        });
    }

    private countFixedColumnIn(a:number,b:number):number{
        let fixedLineCount = 0;
        for (let i = a; i <= b; i++) {
            if (this._fixedColumn.has(i)) {
                fixedLineCount++;
            }
        }
        return fixedLineCount;
    }

    private countFixedRowIn(a:number,b:number):number{
        let fixedLineCount = 0;
        for (let i = a; i <= b; i++) {
            if (this._fixedRow.has(i)) {
                fixedLineCount++;
            }
        }
        return fixedLineCount;
    }

    public calculateFixedHeightPerBlock():number {
        return this._fixedBlockWH.y;
    }

    public calculateFixedWidthPerBlock():number {
        return this._fixedBlockWH.x;
    }

    public calculateFlexWidthPerBlock(parentAreaWidth:number):number {
        const fixedLineCount = this._fixedColumn.size;
        const fixedWidth = fixedLineCount*this._fixedBlockWH.x;
        const flexWidth =  parentAreaWidth - fixedWidth;
        const flexLineCount = this._grid.size.x-fixedLineCount;
        const flexWidthPerBlock = flexWidth/flexLineCount;

        return flexWidthPerBlock;
    }

    public calculateFlexHeightPerBlock(parentAreaHeight:number):number {
        const fixedLineCount = this._fixedRow.size;
        const fixedHeight = fixedLineCount*this._fixedBlockWH.y;
        const flexHeight =  parentAreaHeight - fixedHeight;
        const flexLineCount = this._grid.size.y-fixedLineCount;
        const flexHeightPerBlock = flexHeight/flexLineCount;

        return flexHeightPerBlock;
    }

    public calculateWidth(area: Area, parentAreaWidth: number): number {
        if (area.isFixedWidth) {
            return area.size.x * this.calculateFixedWidthPerBlock();
        }
        return this.calculateFlexWidthPerBlock(parentAreaWidth) * area.size.x;
    }

    public calculateHeight(area: Area, parentAreaHeight: number): number {
        if (area.isFixedWidth) {
            return area.size.x * this.calculateFixedHeightPerBlock();
        }
        return this.calculateFlexHeightPerBlock(parentAreaHeight) * area.size.y;
    }


    public makeFlexWidthPerBlockCSS() : string {
        const fixedLineCount = this._fixedColumn.size;
        const fixedWidth = fixedLineCount*this.calculateFixedWidthPerBlock();
        const flexLineCount = this._grid.size.x-fixedLineCount;

        //(100% - fixedWidth) / flexLineCount

        return `calc(${100/flexLineCount}% - ${fixedWidth/flexLineCount}px)`;
    }

    public makeAreaWidthCSS(area: Area) : string {
        let fixedLineCount = this.countFixedColumnIn(area.position.x,area.position.x + area.size.x-1);
        const flexLineCount = area.size.x - fixedLineCount;
        return `calc(calc(${flexLineCount} * ${this.makeFlexWidthPerBlockCSS()}) + calc(${fixedLineCount} * ${this.calculateFixedWidthPerBlock()}px))`;
    }

    public makeFlexHeightPerBlockCSS() : string {
        const fixedLineCount = this._fixedRow.size;
        const fixedHeight = fixedLineCount*this.calculateFixedHeightPerBlock();
        const flexLineCount = this._grid.size.y-fixedLineCount;

        //(100% - fixedHeight) / flexLineCount

        return `calc(${100/flexLineCount}% - ${fixedHeight/flexLineCount}px)`;
    }

    public makeAreaHeightCSS(area: Area) : string {
        let fixedLineCount = this.countFixedRowIn(area.position.y,area.position.y + area.size.y-1);
        const flexLineCount = area.size.y - fixedLineCount;
        return `calc(calc(${flexLineCount} * ${this.makeFlexWidthPerBlockCSS()}) + calc(${fixedLineCount} * ${this.calculateFixedHeightPerBlock()}px))`;
    }

    public calculatePosX(area: Area, parentWidth:number): number {
        let fixedLineCount = this.countFixedColumnIn(0,area.position.x-1);
        const flexLineCount = area.position.x - fixedLineCount;
        return flexLineCount * this.calculateFlexWidthPerBlock(parentWidth) + fixedLineCount * this.calculateFixedHeightPerBlock();
    }

    public calculatePosY(area: Area, parentWidth:number): number {
        let fixedLineCount = this.countFixedRowIn(0,area.position.x-1);
        const flexLineCount = area.position.y - fixedLineCount;
        return flexLineCount * this.calculateFlexHeightPerBlock(parentWidth) + fixedLineCount * this.calculateFixedHeightPerBlock();
    }

    public makePosXCSS(area: Area): string {
        let fixedLineCount = this.countFixedColumnIn(0,area.position.x-1);
        const flexLineCount = area.position.x - fixedLineCount;
        return `calc(calc(${flexLineCount} * ${this.makeFlexWidthPerBlockCSS()}) + calc(${fixedLineCount} * ${this.calculateFixedWidthPerBlock()}px))`;
    }

    public makePosYCSS(area: Area): string {
        let fixedLineCount = this.countFixedRowIn(0,area.position.y-1);
        const flexLineCount = area.position.y - fixedLineCount;
        return `calc(calc(${flexLineCount} * ${this.makeFlexHeightPerBlockCSS()}) + calc(${fixedLineCount} * ${this.calculateFixedHeightPerBlock()}px))`;
    }
}