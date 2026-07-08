// --- LÓGICA DE LAS PESTAÑAS (TABS) ---
function E(selector, parent) {
    if (selector instanceof HTMLElement) 
        return selector;
    return (parent || document).querySelectorAll(selector);
}

function hasClass(element, className) {
    return element.classList.contains(className);
}

function radioClass(element, className) {
    E("." + className).forEach((elem) => elem.classList.remove(className));
    element.classList.toggle(className);
}

function tabs(nav) {
    let navElem = E(nav)[0];
    if (!navElem) return;

    navElem.addEventListener("click", (e) => {
        let target = e.target;

        if(hasClass(target, "tab")) {
            radioClass(target, "active"); 
            let linkedTab = E("." + target.id)[0];
            if (linkedTab) {
                radioClass(linkedTab, "visible");
            }
        }
    });

    let active = E(".tab.active")[0];
    if (active) {
        radioClass(E("." + active.id)[0], "visible");
    }
}

tabs(".menu-nav");

// --- LÓGICA OPTIMIZADA DE "CARGAR MÁS" ---
function setupLoadMore(btnId, containerClass, itemClass, itemsPerLoad = 4) {
    let btn = document.querySelector(btnId);
    let currentItem = itemsPerLoad;

    if (!btn) return; // Evita errores si el botón no existe en la página

    btn.onclick = () => {
        let boxes = [...document.querySelectorAll(`${containerClass} ${itemClass}`)];
        
        for (let i = currentItem; i < currentItem + itemsPerLoad; i++) {
            if (boxes[i]) { // Previene errores si no hay suficientes elementos
                boxes[i].style.display = 'inline-block'; 
            }
        }
        
        currentItem += itemsPerLoad;
        
        if (currentItem >= boxes.length) {
            btn.style.display = 'none';
        }
    };
}

// Inicializamos los tres botones con la misma función
setupLoadMore('#load-more-1', '.box-container-1', '.box-1');
setupLoadMore('#load-more-2', '.box-container-2', '.box-2');
setupLoadMore('#load-more-3', '.box-container-3', '.box-3');