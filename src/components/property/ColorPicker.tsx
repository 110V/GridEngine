import Content from "../../../grid-engine/Content/Content";
import Bridge from "../../../grid-engine/Bridge";
import { VirtualElement } from "grid-engine/Content/Vdom";
/** @jsx jsx */
import { jsx } from "@src/../grid-engine/Content/jsxRenderer";

import style from './ColorPicker.css';

export default class ColorPicker extends Content {
    private _name:string;
    private _outputLogicName:string;
    
    constructor(id:string,name:string,ouputLogicName:string,bridge:Bridge){
        super(bridge,id);
        this._name = name;
        this._outputLogicName = ouputLogicName;
    }

    protected _render = ()=>{
        return (<div className={style.container}>
            <div>{this._name}</div>
            <input type="text" className={"coloris "+style.button} value="white" />
        </div>)
    }
}