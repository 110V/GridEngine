import Bridge from "grid-engine/Bridge";
import Grid from "../../grid-engine/Grid";
import { Vector2 } from "grid-engine/Vector2";
import GridBlock from "./Edit/GridBlock";

class GridEditor extends Grid{
    private _bridge:Bridge;
    private _blocks:GridBlock[][] = [];

    constructor(bridge:Bridge,size:Vector2){ 
        super(size);
        this._bridge = bridge;
        this.initBlocks();
    }

    private initBlocks(){
        for(let x = 0; x < this.size.x; x++){
            this._blocks[x] = [];
            for(let y = 0; y < this.size.y; y++){
                this._blocks[x][y] = new GridBlock(`${this.id}-${x}-${y}`,"out",this._bridge);
                let area = null;
                if(x==4&&y == 10){
                    area = this.makeArea({x,y},{x:1,y:1},{x:50,y:50},true,true,this._blocks[x][y].id);
                }
                else{
                    area = this.makeArea({x,y},{x:1,y:1},{x:1,y:1},false,false,this._blocks[x][y].id);
                }
                area.setChild(this._blocks[x][y]);
            }
        }
    }
}


export { GridEditor }