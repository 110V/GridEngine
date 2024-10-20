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

                let area = null;
                const id = `${this.id}-${x}-${y}`;
                if(x==4&&y == 10){
                    area = this.makeArea({x,y},{x:1,y:1},{x:100,y:100},true,true,id);
                }
                else{
                    area = this.makeArea({x,y},{x:1,y:1},{x:50,y:100},false,false,id);
                }
                this._blocks[x][y] = new GridBlock(id,"out",this._bridge,area);
                area.setChild(this._blocks[x][y]);
            }
        }
        
    }
}


export { GridEditor }