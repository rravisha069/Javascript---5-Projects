function onClick(yourChoice) {
    var choices = ['rock', 'paper', 'scissor'];
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    var index = Math.floor(Math.random() * 3);
    botChoice = choices[index];
    var result = compareChoices(humanChoice, botChoice);
    showResultInView(humanChoice, result, botChoice);
}

function compareChoices(humanChoice, botChoice) {
    //one way
    // if(humanChoice == botChoice) {
    //     return 'You tied';
    // } else if((humanChoice == 'rock' && botChoice=='scissor') || (humanChoice == 'paper' && botChoice=='rock') || (humanChoice == 'scissor' && botChoice=='paper')) {
    //     return 'You succeed';
    // } else {
    //     return 'You lost';
    // }

    //other way
    var tempResult = {
        'rock': {'rock': 'tie', 'paper': 'lost', 'scissor': 'won'},
        'paper': {'rock': 'won', 'paper': 'tie', 'scissor': 'lost'},
        'scissor': {'rock': 'lost', 'paper': 'won', 'scissor': 'tie'}
    }

    console.log('test ', tempResult[humanChoice][botChoice]);

    if(tempResult[humanChoice][botChoice] === 'won') {
        return {'message': 'You Won', 'color': 'green'};
    } else if(tempResult[humanChoice][botChoice] === 'lost') {
        return {'message': 'You Lost', 'color': 'red'};
    } else {
        return {'message': 'You Tie', 'color': 'Yellow'};
    }
}

function showResultInView(humanChoice, result, botChoice) {
    var img1 = document.createElement('img');
    img1.setAttribute('src', document.getElementById(humanChoice).src);
    img1.setAttribute('class', 'img1');
    var h1 = document.createElement('h1');
    var text = document.createTextNode(result.message);
    h1.setAttribute('style', 'color:'+result.color+';');
    h1.appendChild(text);
    var img3 = document.createElement('img');
    img3.setAttribute('src', document.getElementById(botChoice).src);
    img3.setAttribute('class', 'img3');
    document.getElementById('imageContainer').remove();
    document.getElementById('result').appendChild(img1);
    document.getElementById('result').appendChild(h1);
    document.getElementById('result').appendChild(img3);
}