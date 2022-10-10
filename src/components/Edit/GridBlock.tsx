import Content from "../../../grid-engine/Content/Content";
import Bridge from "../../../grid-engine/Bridge";
/** @jsx jsx */
import { jsx } from "@src/../grid-engine/Content/jsxRenderer";
import style from './GridBlock.css';
import Area from "grid-engine/Area";

enum BlockDisplayState{
    None,
    On,
    Focus,
}

export default class GridBlock extends Content {
    
    private _state:BlockDisplayState = BlockDisplayState.None;
    private _outputLogicName:string;
    private _area:Area;

    constructor(id: string, outputLogicName: string, bridge: Bridge,area:Area) {
        super(bridge,id);
        this._area = area;
        this._outputLogicName = outputLogicName;
    }

    protected _render = ()=>{
        let box_style = style.none;
        if(this._state==BlockDisplayState.Focus){
            box_style = style.focus;
        }else if (this._state==BlockDisplayState.On){
            box_style = style.on;
        }
        return (<div id={this.id} className={style.box+" "+box_style} 
                onmouseenter={this.onMouseEnter} 
                onmouseleave={this.onMouseOut} 
                onclick={this.onMouseClick}>
        </div>)
    }

    private onMouseEnter= ()=>{
        this._state = BlockDisplayState.On;
        this.render();
    }

    private onMouseOut=()=>{
        this._state = BlockDisplayState.None;
        this.render();
    }

    private onMouseClick=()=>{
        this._state = BlockDisplayState.None;
        this._bridge.runLogic("test",this._area);
        this.render();
    }

}