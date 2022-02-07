
interface VirtualElement {
    tag: string,
    options: any,
    childs: (VirtualElement | string)[],
}

function createElement(tag: string, options: any, childs: VirtualElement[]): VirtualElement {
    return { tag, options, childs };
}

function render(velement: VirtualElement): HTMLElement {
    const element = document.createElement(velement.tag);
    Object.assign(element, velement.options);
    if (velement.childs) {
        velement.childs.forEach(child => {
            if (typeof child === "string") {
                element.innerHTML += child;
            }
            else {
                element.appendChild(render(child));
            }
        });
    }
    return element;
}

function update(newEl: string | VirtualElement | null, prevEl: string | VirtualElement | null, element: HTMLElement) {
    const isNewString = typeof newEl === "string";
    const isPrevString = typeof prevEl === "string";
    if (isNewString && isPrevString) {
        element.innerHTML = newEl;
    }
    else if (isNewString && !isPrevString) {
        element.replaceWith(newEl);
    }
    else if (!isNewString && isPrevString) {
        element.replaceWith(render(newEl as VirtualElement));
    }
    else if (!prevEl && newEl) {
        element.replaceWith(render(newEl as VirtualElement));
        return;
    }
    else if (prevEl && !newEl) {
        element.remove();
    }
    else if (prevEl && newEl) {
        const newv = newEl as VirtualElement;
        const prevv = prevEl as VirtualElement;
        if (isPrevString || prevEl.tag !== newv.tag) {
            element.replaceWith(render(newv));
        }
        else if (prevEl.options !== newv.options) {
            while (element.attributes.length > 0) {
                element.removeAttributeNode(element.attributes[0]);
            }
            Object.assign(element, newv.options);
        }
        const prevLength = prevv.childs.length;
        const newLength = newv.childs.length;

        for (let i = 0; i < Math.min(prevLength, newLength); i++) {
            update(newv.childs[i], prevv.childs[i], element.childNodes[i] as HTMLElement);
        }
        for (let i = prevLength; i < newLength; i++) {
            if (typeof newv.childs[i] === "string") {
                element.innerHTML += newv.childs[i];
            }
            else {
                element.appendChild(render(newv.childs[i] as VirtualElement));
            }
        }
        for (let i = newLength; i < prevLength; i++) {
            update(null, prevv.childs[i], element.childNodes[i] as HTMLElement);
        }
    }
}


export { VirtualElement, createElement, render, update };