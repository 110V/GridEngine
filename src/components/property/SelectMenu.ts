import Content from "../../../grid-engine/Content";
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
    const dropdown = document.createElement("div");
    dropdown.className = "ui dropdown icon";
    const element_name = document.createElement("div");
    element_name.className = "value-name"
    this._htmlElement.innerText = name;
    this._htmlElement.appendChild(element_name);

    const element_input = document.createElement("input");
    element_input.type = "hidden"
    element_input.name = name;

    dropdown.appendChild(element_input);
    element_input.value="center";
    element_input.addEventListener("change", () => {
      console.log("aa");
      bridge.runLogic("ouputLogicName",element_input.value);
      console.log("킄크");
    })
    console.log(element_input.onchange=()=>{console.log("a")});
    dropdown.innerHTML += `
        <i class="dropdown icon"></i>
        <div class="default text">${name}</div>
        <div class="menu">
          ${menus.map((v, i) => {
      return `<div class="item" data-value="${v.value}">${v.key}</div>`
    }).join("\n")
      }
        </div>`;
    this._htmlElement.appendChild(dropdown);

  }
}
export { Menu, SelectMenu }