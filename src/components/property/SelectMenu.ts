import Content from "../../../grid-engine/Content/Content";
import Grid from "../../../grid-engine/Grid";
import Bridge from "../../../grid-engine/Bridge";
interface Menu {
  key: string,
  value: string,
}

class SelectMenu extends Content {
  constructor(name: string, menus: Menu[],ouputLogicName:string,bridge:Bridge) {
    super(document.createElement("div"));
    this._htmlElement.className = "value-component";
    const element_name = document.createElement("div");
    element_name.className = "select-name"
    this._htmlElement.innerText = name;
    this._htmlElement.appendChild(element_name);
    const element_select = document.createElement("select");
    element_select.className = "select";
    menus.forEach(menu =>{
      const element_option = document.createElement("option");
      element_option.value = menu.value;
      element_option.innerText = menu.key;
      element_select.appendChild(element_option);
    });
    element_select.value = menus[0].value;

    element_select.addEventListener("change", () => {
      console.log("aa");
      bridge.runLogic("ouputLogicName",element_select.value);
    })
    console.log(element_select.onchange=()=>{console.log("a")});
    this._htmlElement.appendChild(element_select);
  }
}
export { Menu, SelectMenu }