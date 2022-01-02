import Content from "../../../grid-engine/Content";
import Flu from "../../../grid-engine/Flu";
import Grid from "../../../grid-engine/Grid";

interface Menu {
  key: string,
  value: string,
}

class SelectMenu extends Content {
  constructor(name: string, value: Flu<string>, menus: Menu[]) {
    super(document.createElement("div"));
    this._htmlElement.className = "value-component";
    const dropdown = document.createElement("div");
    dropdown.className = "ui dropdown icon";
    const element_name = document.createElement("div");
    element_name.className = "value-name"
    this._htmlElement.innerText = name;
    this._htmlElement.appendChild(element_name);
    value.register((v)=>{
    const element_input = document.createElement("input");
    element_input.type = "hidden"
    element_input.name = name
    value.register((v)=>{
      element_input.value = v;
    },true)
    element_input.addEventListener("change",()=>{
      value.set(element_input.value);
    });

    dropdown.appendChild(element_input);
    element_input.addEventListener("change",()=>{
      element_input.value
    })
    })
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