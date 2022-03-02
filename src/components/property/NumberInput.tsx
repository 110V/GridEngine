import Content from "../../../grid-engine/Content/Content";
import Bridge from "../../../grid-engine/Bridge";
import TextInput from "./TextInput";
/** @jsx jsx */
import { jsx } from "@src/../grid-engine/Content/jsxRenderer";
import style from './TextInput.css';

export default class NumberInput extends Content{
    private _name:string;
    constructor(id:string,name:string,ouputLogicName:string,bridge:Bridge){
        super(bridge,id);
        this._name = name;
    }
    protected _render = ()=>{
        return (
        <div className={style.container}>
            <div>{this._name}</div>
            <input type="number" className={style.input} />
        </div>)
    }
}