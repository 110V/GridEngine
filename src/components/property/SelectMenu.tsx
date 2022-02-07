import Content from "../../../grid-engine/Content/Content";
import Grid from "../../../grid-engine/Grid";
import Bridge from "../../../grid-engine/Bridge";
/** @jsx jsx */
import { jsx } from "@src/../grid-engine/Content/jsxRenderer";
import { randomId } from "@src/../grid-engine/Utils";;

interface Menu {
  key: string,
  value: string,
}

class SelectMenu extends Content {
  private _name:string;
  private _menus:Menu[];
  constructor(name: string, menus: Menu[],ouputLogicName:string,bridge:Bridge,id:string=randomId("select")) {
    super(bridge,id);
    this._name = name;
    this._menus = menus;
  }

  protected _render = ()=>{
    return(<div className="value-component">
      <div className="select-name">
        {this._name}
      </div>
      <select className="select">
        {this._menus.map((menu)=>(<option value={menu.value}> {menu.key}</option>))}
      </select>
    </div>)
  }
}
export { Menu, SelectMenu }