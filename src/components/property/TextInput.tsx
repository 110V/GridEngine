import Bridge from "grid-engine/Bridge";
import { randomId } from "@src/../grid-engine/Utils";;
import Content from "../../../grid-engine/Content/Content";

/** @jsx jsx */
import { jsx } from "@src/../grid-engine/Content/jsxRenderer";

import style from './TextInput.css';
export default class TextInput extends Content {
    private _name:string;
    constructor(name:string,ouputLogicName:string,bridge:Bridge,id:string=randomId("textinput")){
        super(bridge,id);
        this._name = name;
    }
    protected _render = ()=>{
        return (
        <div className={style.container}>
            <div>{this._name}</div>
            <input type="text" className={style.input} />
        </div>)
    }
}