const btnSize = document.getElementById('size-submit');
const box = document.getElementById('box-number');
const result = document.getElementById('result');
const typeFactor = document.querySelector("[name=type]");
let randomNumber;
let firstChild;
let lastChild;
let count;

btnSize.addEventListener('click', () => {
    removeAllChildNodes(box);
    const inputSize = document.querySelector("[name=size]");
    let value = parseInt(inputSize.value);
    if (value < 5 || value > 500) {
        value = 50;
    }
    createBoxNumbers(value);
    randomNumber = Math.round(Math.random()*value);
    firstChild = 0;
    lastChild = value - 1;
    count = 0;
    inputSize.value = value;
});

function initialize() {
    randomNumber = Math.round(Math.random()*50);
    firstChild = 0;
    lastChild = 49;
    count = 0;
    typeFactor.value = '0';
    createBoxNumbers();
}

function createBoxNumbers(n = 50) {
    for (let i = 1; i <= n; i++) {
        const number = document.createElement("span");
        number.classList.add("m-2");
        number.classList.add("number-box");
        number.id = String(i - 1);
        number.style.cursor = 'pointer';
        number.addEventListener('click', chooseNumber);
        number.innerText = i;
        box.appendChild(number);
    }
}

function chooseNumber(event) {
    const number = parseInt(event.target.innerText);
    const id = parseInt(event.target.id);
    count++;
    document.getElementById('count').innerHTML = count;
    if (number === randomNumber) {
        result.innerText = 'Si, ese es mi número :D';
        box.children[id].style.backgroundColor = "rgba(123,239,178,0.5)";
        for(let i = firstChild; i <= lastChild; i++) {
            box.children[i].removeEventListener('click', chooseNumber);
        }
    } else if (randomNumber > number) {
        result.innerText = "Mi número es mayor que " + number + ".";
        for(let i = firstChild; i <= id; i++) {
            const child = box.children[i];
            child.style.backgroundColor = "rgba(240,52,52,0.5)";
            child.removeEventListener('click', chooseNumber);
        }
        firstChild = number;
    } else {
        result.innerText = "Mi número es menor que " + number + ".";
        for(let i = lastChild; i >= id; i--) {
            const child = box.children[i];
            child.style.backgroundColor = "rgba(240,52,52,0.5)";
            child.removeEventListener('click', chooseNumber);
        }
        lastChild = number;
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

initialize();