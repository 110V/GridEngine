import Area from "../Area";
import Grid from "../Grid";
import { Vector2 } from "../Vector2";


export default class BlockSizing {
    private _grid: Grid;
    private _rowHeights:number[] = [];
    private _fixedRowHeightSum = 0;
    private _columnWidths:number[] = [];
    private _fixedColumnWidthSum = 0;

    private _fixedColumnCount = 0;
    private _fixedRowCount = 0;
    constructor(grid: Grid) {
        this._grid = grid;
        this.calculateSizes();
    }

    private calculateSizes() {
        this._rowHeights = new Array(this._grid.size.y).fill(-1);
        this._columnWidths = new Array(this._grid.size.x).fill(-1);
        this._fixedColumnCount = 0;
        this._fixedRowCount = 0;
        this._grid.areas.forEach(area => {
            
            if(area.isFixedWidth) {
                for(let i = area.position.x; i<=area.position.x+area.size.x-1;i++){
                    const widthPerBlock = area.fixedSize.x/area.size.x;
                    if (this._columnWidths[i] == -1) {
                        this._fixedColumnCount++;
                    }
                    this._columnWidths[i] = Math.max(this._columnWidths[i],widthPerBlock);
                }
            }
            if(area.isFixedHeight) {
                for(let i = area.position.y; i<=area.position.y+area.size.y-1;i++){
                    const heightPerBlock = area.fixedSize.y/area.size.y;
                    if (this._rowHeights[i] == -1) {
                        this._fixedRowCount++;
                    }
                    this._rowHeights[i] = Math.max(this._rowHeights[i],heightPerBlock);
                }
            }
        });

        console.log(this._columnWidths,this._rowHeights);
        this._fixedColumnWidthSum = this._columnWidths.reduce((a,b)=>a+(b==-1?0:b),0);
        this._fixedRowHeightSum = this._rowHeights.reduce((a,b)=>a+(b==-1?0:b),0);
    }

    public countColumn(x1:number,x2:number):[flexCount:number,fixedSize:number]{
        let fixedSize = 0;
        let flexCount = 0;
        for(let i = x1;i<=x2;i++) {
            if(this._columnWidths[i] == -1) {
                flexCount++;
            } else {
                fixedSize += this._columnWidths[i];
            }
        }
        return [flexCount,fixedSize];
    }

    public countRow(y1:number,y2:number):[flexCount:number,fixedSize:number]{
        let fixedSize = 0;
        let flexCount = 0;
        for(let i = y1;i<=y2;i++) {
            if(this._rowHeights[i] == -1) {
                flexCount++;
            } else {
                fixedSize += this._rowHeights[i];
            }
        }

        return [flexCount,fixedSize];
    }

    public calculateFlexWidthPerBlock(parentAreaWidth:number):number {
        const flexWidth =  parentAreaWidth - this._fixedColumnWidthSum;
        const flexLineCount = this._grid.size.x-this._fixedColumnCount;
        const flexWidthPerBlock = flexWidth/flexLineCount;
        return flexWidthPerBlock;
    }

    public calculateFlexHeightPerBlock(parentAreaHeight:number):number {
        const flexHeight =  parentAreaHeight - this._fixedRowHeightSum;
        const flexLineCount = this._grid.size.x-this._fixedRowCount;
        const flexHeightPerBlock = flexHeight/flexLineCount;
        return flexHeightPerBlock;
    }

    public calculateWidth(area: Area, parentAreaWidth: number): number {
        if (area.isFixedWidth) {
            return area.fixedSize.x/area.size.x;
        }
        return this.calculateFlexWidthPerBlock(parentAreaWidth) * area.size.x;
    }

    public calculateHeight(area: Area, parentAreaHeight: number): number {
        if (area.isFixedHeight) {
            return area.fixedSize.y/area.size.y;
        }
        return this.calculateFlexHeightPerBlock(parentAreaHeight) * area.size.y;
    }


    public makeFlexWidthPerBlockCSS() : string {
        const flexLineCount = this._grid.size.x-this._fixedColumnCount;

        //(100% - fixedWidth) / flexLineCount
        if(flexLineCount == 0) {
            return "0px";
        }
        return `calc(${100/flexLineCount}% - ${this._fixedColumnWidthSum/flexLineCount}px)`;
    }

    public makeAreaWidthCSS(area:Area) : string {
        const [flexCount,fixedSize] = this.countColumn(area.position.x,area.position.x+area.size.x-1);        
        return `calc(calc(${flexCount} * ${this.makeFlexWidthPerBlockCSS()}) + calc(${fixedSize}px))`;
    }

    public makeFlexHeightPerBlockCSS() : string {
        const flexLineCount = this._grid.size.y-this._fixedRowCount;

        //(100% - fixedWidth) / flexLineCount
        if(flexLineCount == 0) {
            return "0px";
        }
        return `calc(${100/flexLineCount}% - ${this._fixedRowHeightSum/flexLineCount}px)`;
    }

    public makeAreaHeightCSS(area: Area) : string {
        const [flexCount,fixedSize] = this.countRow(area.position.y,area.position.y+area.size.y-1); 
        return `calc(calc(${flexCount} * ${this.makeFlexHeightPerBlockCSS()}) + ${fixedSize}px)`;
    }

    public calculatePosX(area: Area, parentWidth:number): number {
        const [flexCount,fixedSize] = this.countColumn(0,area.position.x-1);
        return flexCount * this.calculateFlexWidthPerBlock(parentWidth) + fixedSize;
    }

    public calculatePosY(area: Area, parentHeight:number): number {
        const [flexCount,fixedSize] = this.countColumn(0,area.position.y-1);
        return flexCount * this.calculateFlexHeightPerBlock(parentHeight) + fixedSize;
    }

    public makePosXCSS(area: Area): string {
        const [flexCount,fixedSize] = this.countColumn(0,area.position.x-1);
        return `calc(calc(${flexCount} * ${this.makeFlexWidthPerBlockCSS()}) + ${fixedSize}px)`;
    }

    public makePosYCSS(area: Area): string {
        const [flexCount,fixedSize] = this.countRow(0,area.position.y-1);
        return `calc(calc(${flexCount} * ${this.makeFlexHeightPerBlockCSS()}) + ${fixedSize}px)`;
    }
}