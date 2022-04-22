var allButtons = document.getElementsByTagName('button');

var copyOfAllButtons = [];
for(let i=0; i<allButtons.length; i++) {
    copyOfAllButtons.push(allButtons[i].classList[1]);
}


function onColorChange(selectElement) {
// console.log(selectElement.value);
// var allButtons = document.getElementsByTagName('button');
// allButtons[0].setAttribute('style', 'background-color: '+selectElement.value);
// allButtons[1].setAttribute('style', 'background-color: '+selectElement.value);
// allButtons[2].setAttribute('style', 'background-color: '+selectElement.value);

if(selectElement.value === 'Red') {
    buttonsRed();
} else if(selectElement.value === 'Green') {
    buttonsGreen();
} else if(selectElement.value === 'Reset') {
    buttonsReset();
} else {
    buttonsRandom();
}
}

function buttonsRed() {
    for(let i=0; i<allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for(let i=0; i<allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}

function buttonsReset() {
    for(let i=0; i<allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyOfAllButtons[i]);
    }
}

function buttonsRandom() {
    for(let i=0; i<allButtons.length; i++) {
        var index = Math.floor(Math.random() * copyOfAllButtons.length);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyOfAllButtons[index]);
    }
}