"use strict";
const containerStars = document.querySelector(".white-starts");
const creatStars = function (quantity) {
    const cont = quantity;
    let arrElement = new Array();
    for (let i = 0; i < cont; i++) {
        const li = document.createElement("li");
        const random = (min, max) => {
            return Math.random() * (max - min) + min;
        };
        const size = Math.floor(random(10, 60));
        li.style.width = `${size}px`;
        li.style.height = `${size}px`;
        li.style.bottom = `-${size}px`;
        const positionLeft = Math.floor(random(1, 95));
        const positionTop = Math.floor(random(10, 90));
        li.style.left = `${positionLeft}%`;
        li.style.top = `${positionTop}%`;
        const delay = Math.floor(random(3, 0.1));
        li.style.animationDelay = `${delay}s`;
        const duration = Math.floor(random(20, 10));
        li.style.animationDuration = `${duration}s`;
        li.style.animationTimingFunction = `cubic-bezier(
      ${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}
    )`;
        arrElement.push(li);
    }
    return arrElement;
};
const applyDOM = function (arrElements) {
    const arr = arrElements;
    if (containerStars != null) {
        containerStars.replaceChildren(...arr);
    }
    else {
        throw new Error("Os elementos não foram aplicados ao DOM!");
    }
};
applyDOM(creatStars(25));
