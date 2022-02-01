
function jsx(type: string, options: any, ...childs: (HTMLElement | string)[]): HTMLElement {
    const element = document.createElement(type);
    childs.forEach(child => element.appendChild(typeof child === "string" ? new Text(child) : child));
    return element;
}

export { jsx };
