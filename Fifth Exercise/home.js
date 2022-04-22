document.querySelector('#hitButton').addEventListener('click', onHitButton);
document.querySelector('#standButton').addEventListener('click', onStandButton);
document.querySelector('#standButton').setAttribute('disabled', true);
document.querySelector('#dealButton').setAttribute('disabled', true);
document.querySelector('#dealButton').addEventListener('click', onDealButton);

const hitSound = new Audio('./sounds/swish.m4a');
const aww = new Audio('./sounds/aww.mp3');
const cash = new Audio('./sounds/cash.mp3');
var youPoint = 0;
var dealerPoint = 0;
var wins = 0;
var losses = 0;
var draws = 0;

var cardsObject = {
    '2': {'source': './images/2.png', 'value': 2},
    '3': {'source': './images/3.png', 'value': 3},
    '4': {'source': './images/4.png', 'value': 4},
    '5': {'source': './images/5.png', 'value': 5},
    '6': {'source': './images/6.png', 'value': 6},
    '7': {'source': './images/7.png', 'value': 7},
    '8': {'source': './images/8.png', 'value': 8},
    '9': {'source': './images/9.png', 'value': 9},
    '10': {'source': './images/10.png', 'value': 10},
    'A': {'source': './images/A.png', 'value': 11},
    'J': {'source': './images/J.png', 'value': 10},
    'K': {'source': './images/K.png', 'value': 10},
    'Q': {'source': './images/Q.png', 'value': 10},
}

function getRandomCard() {
    var cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'K', 'Q'];
    var index = Math.floor(Math.random() * cards.length);
    return cardsObject[cards[index]];
}

function onHitButton() {
    var card = getRandomCard();
    if(card['value'] == 11 && youPoint <= 21) {
        card['value'] = 11;
    } else if(card['value'] == 11 && youPoint > 21) {
        card['value'] = 1;
    }
    youPoint = youPoint + card['value'];
    if(youPoint <= 21 && document.querySelector('#yourBlackJackPts').textContent !== 'Bust!') {
        var image = document.createElement('img');
        image.src = card['source'];
        document.getElementById('youDiv').appendChild(image);
        document.querySelector('#yourBlackJackPts').textContent = youPoint;
        hitSound.play();
    } else {
        document.querySelector('#yourBlackJackPts').textContent = 'Bust!';
        document.querySelector('#yourBlackJackPts').style.color = 'red';
    }
    document.querySelector('#standButton').removeAttribute('disabled');
}

function timer(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}

async function onStandButton() {
    document.querySelector('#hitButton').setAttribute('disabled', true);
    document.querySelector('#standButton').setAttribute('disabled', true);
    while(dealerPoint < 16) {
        var card = getRandomCard();
        if(card['value'] == 11 && dealerPoint <= 21) {
            card['value'] = 11;
        } else if(card['value'] == 11 && dealerPoint > 21) {
            card['value'] = 1;
        }
        dealerPoint = dealerPoint + card['value'];
        if(dealerPoint <= 21 && document.querySelector('#dealerBlackJackPts').textContent !== 'Bust!') {
            var image = document.createElement('img');
            image.src = card['source'];
            document.getElementById('dealerDiv').appendChild(image);
            document.querySelector('#dealerBlackJackPts').textContent = dealerPoint;
            hitSound.play();
        } else {
            document.querySelector('#dealerBlackJackPts').textContent = 'Bust!';
            document.querySelector('#dealerBlackJackPts').style.color = 'red';
        }
        await timer(1000);
    }   
    
    if(dealerPoint > 15) {
        showResult();
    }

    document.querySelector('#dealButton').removeAttribute('disabled');
}

function onDealButton() {
    var yourCard = document.querySelector('#youDiv').querySelectorAll('img');
    var dealerCard = document.querySelector('#dealerDiv').querySelectorAll('img');

    yourCard.forEach(element => {
        element.remove();
    });

    dealerCard.forEach(element => {
        element.remove();
    });
    youPoint = 0;
    dealerPoint = 0;
    document.querySelector('#yourBlackJackPts').textContent = 0;
    document.querySelector('#dealerBlackJackPts').textContent = 0;

    document.querySelector('#yourBlackJackPts').style.color = 'white';
    document.querySelector('#dealerBlackJackPts').style.color = 'white';

    document.querySelector('#currentGameResult').textContent = `Let's play`;
    document.querySelector('#currentGameResult').style.color = 'black';

    document.querySelector('#hitButton').removeAttribute('disabled');
    document.querySelector('#standButton').setAttribute('disabled', true);
    document.querySelector('#dealButton').setAttribute('disabled', true);
}

function computeResult() {
    var winner;
    if(youPoint <= 21) {
        if(youPoint > dealerPoint || dealerPoint > 21) {
            winner = 'you';
        } else if(youPoint < dealerPoint) {
            winner = 'dealer';
        } else if(youPoint === dealerPoint) {
            winner = 'none';
        }
    } else if(youPoint > 21 && dealerPoint <= 21) {
        winner = 'dealer';
    } else if(youPoint > 21 && dealerPoint > 21) {
        winner = 'none';
    }
    return winner; 
}

function showResult() {
    var resultElement = document.querySelector('#currentGameResult');
    if(computeResult() === 'you') {
        resultElement.textContent = 'You Won!';
        resultElement.style.color = 'green';
        wins = wins + 1;
        document.querySelector('#wins').textContent = wins;
        cash.play();
    } else if(computeResult() === 'dealer') {
        resultElement.textContent = 'You Lost!';
        resultElement.style.color = 'red';
        losses = losses + 1;
        document.querySelector('#loses').textContent = losses;
        aww.play();
    } else {
        resultElement.textContent = 'You Drew!';
        resultElement.style.color = 'yellow';
        draws = draws + 1;
        document.querySelector('#draws').textContent = draws;
    } 
}