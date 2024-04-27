"use strict";
const find = (selector) => {
    return document.querySelector(selector);
}

const body = find("body");

body.style.height = `${window.innerHeight}px`;

const next1 = find("#next1");
const next2 = find("#next2");
const previous1 = find("#previous1");
const previous2 = find("#previous2");
const layer1 = find('.step1');
const layer2 = find('.step2');
const layer3 = find('.step3');
const progress = find('.progress');
const stage2 = find('#stage2');
const stage3 = find('#stage3');
let percentGreen = 0;


// progressBar animation
const checkedStage = (stage) => {
    stage.style.backgroundColor = '#38ad60';
    stage.style.color = 'white';
    progress.style.background = `linear-gradient(90deg, #38ad60 ${percentGreen += 50}%, white 0%)`;
}

const unCheckedStage = (stage) => {
    stage.style.backgroundColor = 'white';
    stage.style.color = 'black';
    progress.style.background = `linear-gradient(90deg, #38ad60 ${percentGreen -= 50}%, white 0%)`;
}

// animation function
const animationIn = (layer) => {
    layer.style.animationName = 'slideIn';
    layer.style.animationDuration = "0.5s";
}
const animationOut = (layer) => {
    layer.style.animationName = 'slideOut';
    layer.style.animationDuration = "0.5s";
}
const hiddeDivAnimation = (layer) => {
    layer.style.animationName = 'opacityIn';
    layer.style.animationDuration = "0.5s";
}
const exposeDiv = (layer) => {
    layer.style.animationName = 'opacityOut';
    layer.style.animationDuration = "0.5s";
}
const addHiddeClass = (layer1, layer2) => {
    layer1.classList.toggle("hidde");
    layer2.classList.toggle("hidde");
}

// animation orders
const orders1 = (layer1, layer2) => {
    setTimeout(() => {
        addHiddeClass(layer1, layer2);
    }, 300)
    setTimeout(() => {
        animationIn(layer2);
    }, 200)
    setTimeout(() => {
        hiddeDivAnimation(layer1);
    }, 100)
}

const orders2 = (layer1, layer2) => {
    setTimeout(() => {
        addHiddeClass(layer1, layer2);
    }, 300)
    setTimeout(() => {
        exposeDiv(layer1);
    }, 200)
    setTimeout(() => {
        animationOut(layer2);
    }, 100)
}

// events
next1.addEventListener('click', () => {
    orders1(layer1, layer2);
    checkedStage(stage2);
})

next2.addEventListener('click', () => {
    orders1(layer2, layer3);
    checkedStage(stage3);
})

previous1.addEventListener('click', () => {
    orders2(layer1, layer2);
    unCheckedStage(stage2);
})

previous2.addEventListener('click', () => {
    orders2(layer2, layer3);
    unCheckedStage(stage3);
})



