import Content from "../../../grid-engine/Content/Content";
import Bridge from "../../../grid-engine/Bridge";
/** @jsx jsx */
import { jsx } from "grid-engine/Content/jsxRenderer";
import style from './Checkbox.css';

export default class CheckboxInput extends Content {
    private _isChecked:boolean;
    private _name:string;
    private _outputLogicName:string;
    private _bridge:Bridge;

    constructor(id: string, name: string,defaultVar:boolean, outputLogicName: string, bridge: Bridge) {
        super(<div></div>);
        this._id = id;
        this._name = name;
        this._outputLogicName = outputLogicName;
        this._isChecked = defaultVar;
        this._bridge = bridge;
    }

    private Init(){
        this._htmlElement = (<div id={this.id}>
            <label className={style.container}>
                <input className={style.hide} type="checkbox" onChange={this.onChanged}/>
                <span className={style.box}>
                    <div className={this._isChecked?style.checked:''}/>
                </span>
                <div className={style.name} >{name}</div>
            </label>
        </div>)   
    }

    private onChanged = ()=>{
        
    }


}