import { createElement, VirtualElement } from "./Vdom";

function jsx(type: string, options: any, ...childs: (VirtualElement|string)[]): VirtualElement {
    childs = childs.flat();
    const element = createElement(type,options,childs);
    return element;
}

export { jsx };
