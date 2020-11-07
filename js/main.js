const btnSize = document.getElementById('size-submit');
const btnStartAll = document.getElementById('submitAll');
const boxm = document.getElementById('box-manual');
const boxl = document.getElementById('box-lineal');
const boxb = document.getElementById('box-binary');
const resultm = document.getElementById('result');
const resultl = document.getElementById('resultl');
const resultb = document.getElementById('resultb');
const btnStartl = document.getElementById("startl");
const btnStartb = document.getElementById("startb");
let randomNumber;
let firstChild;
let lastChild;
let size;
let count;
let countl;
let countb;

// functions
function initialize() {
    randomNumber = Math.round(Math.random()*50);
    firstChild = 0;
    lastChild = 49;
    size = 50;
    count = 0;
    countl = 0;
    countb = 0;
    createBoxNumbers(50, boxm);
    createBoxNumbers(50, boxl);
    createBoxNumbers(50, boxb);
}

function initializeEvents() {
    btnStartl.addEventListener('click', linearSearch);
    btnStartl.disabled = false;

    btnStartb.addEventListener('click', binarySearch);
    btnStartb.disabled = false;
}

function createBoxNumbers(n, component) {
    for (let i = 1; i <= n; i++) {
        const box = document.createElement("span");
        box.classList.add("m-2");
        box.classList.add("number-box");
        box.id = String(i - 1);
        box.style.cursor = 'pointer';
        if (component.id === 'box-manual') {
            box.addEventListener('click', chooseNumber);
        }
        box.innerText = i;
        component.appendChild(box);
    }
}

function chooseNumber(event) {
    const number = parseInt(event.target.innerText);
    const id = parseInt(event.target.id);
    count++;
    document.getElementById('count').innerHTML = count;
    if (number === randomNumber) {
        result.innerText = 'Si, ese es mi número :D';
        boxm.children[id].style.backgroundColor = "rgba(123,239,178,0.5)";
        for(let i = firstChild; i <= lastChild; i++) {
            boxm.children[i].removeEventListener('click', chooseNumber);
        }
    } else if (randomNumber > number) {
        result.innerText = "Mi número es mayor que " + number + ".";
        for(let i = firstChild; i <= id; i++) {
            const child = boxm.children[i];
            child.style.backgroundColor = "rgba(240,52,52,0.5)";
            child.removeEventListener('click', chooseNumber);
        }
        firstChild = number;
    } else {
        result.innerText = "Mi número es menor que " + number + ".";
        for(let i = lastChild; i >= id; i--) {
            const child = boxm.children[i];
            child.style.backgroundColor = "rgba(240,52,52,0.5)";
            child.removeEventListener('click', chooseNumber);
        }
        lastChild = id;
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

async function linearSearch() {
    btnStartl.disabled = true;
    for(let i = 0; i < size; i++) {
        const number = parseInt(boxl.children[i].innerText);
        countl++;
        document.getElementById('countl').innerHTML = countl;
        if (number === randomNumber) {
            resultl.innerText = 'Si, el ' +  randomNumber + ' mi número :D';
            boxl.children[i].style.backgroundColor = "rgba(123,239,178,0.5)";
            return;
        } else {
            resultl.innerText = 'Ese no es mi número';
            boxl.children[i].style.backgroundColor = "rgba(240,52,52,0.5)";
        }
        // await sleep(2000);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function binarySearch() {
    let min = 0;
    let max = size - 1;
    let guess;
    btnStartb.disabled = true;
    while(max >= min) {
        guess = Math.floor((max+min)/2);
        boxb.children[min].style.backgroundColor = "rgba(255,255,0,0.5)";
        boxb.children[max].style.backgroundColor = "rgba(255,255,0,0.5)";
        boxb.children[guess].style.backgroundColor = "rgba(255,0,0,0.5)";
        const valueBox = parseInt(boxb.children[guess].innerText);
        countb++;
        document.getElementById('countb').innerHTML = countb;
        // await sleep(1000);
        if(valueBox === randomNumber){
            resultb.innerText = 'Si, el ' +  randomNumber + ' mi número :D';
            boxb.children[guess].style.backgroundColor = "rgba(123,239,178,0.5)";
            return; 
        } else if(valueBox < randomNumber) {
            for(let i = min; i < guess; i++) {
                resultb.innerText = 'Mi número es menor que ' + valueBox;
                boxb.children[i].style.backgroundColor = "rgba(240,52,52,0.5)";
            }
            min = guess + 1;
        }
        else {
            for(let i = max; i > guess; i--) {
                resultb.innerText = 'Mi número es mayor que ' + valueBox;
                boxb.children[i].style.backgroundColor = "rgba(240,52,52,0.5)";
            }
            max = guess - 1;
        }
        // await sleep(1000);
    }
    return -1;
};

btnStartAll.addEventListener('click', () => {
    linearSearch();
    binarySearch();
});


// EventListeners
btnSize.addEventListener('click', () => {
    removeAllChildNodes(boxm);
    removeAllChildNodes(boxl);
    removeAllChildNodes(boxb);
    const inputSize = document.querySelector("[name=size]");
    let value = parseInt(inputSize.value);
    if (value < 5 || value > 50000) {
        value = 50;
    }
    createBoxNumbers(value, boxm);
    createBoxNumbers(value, boxl);
    createBoxNumbers(value, boxb);
    randomNumber = Math.round(Math.random()*value);
    firstChild = 0;
    lastChild = value - 1;
    size = value;
    count = 0;
    inputSize.value = value;
    initializeEvents();
});

function seeAllNumbers(event) {
    switch(event[0]){
        case 'lineal':
            boxl.style.overflow = event[1];
            boxl.style.maxHeight = event[1] === 'visible' ? '100%' : '200px';
            break;
        
        case 'binary':
            boxb.style.overflow = event[1];
            boxb.style.maxHeight = event[1] === 'visible' ? '100%' : '200px';
            break;
        
        case 'binaryM':
            boxm.style.overflow = event[1];
            boxm.style.maxHeight = event[1] === 'visible' ? '100%' : '200px';
            break;
    }
}

// main
initialize();
initializeEvents();