function ageInDays() {
    var birthYear = prompt('What is your birth year?');
    var ageInDays = (new Date().getFullYear() - birthYear) * 365;
    var h1 = document.createElement('h1');
    var content = document.createTextNode('You are ' + ageInDays + ' days old');
    h1.setAttribute('id', 'newly-added-h1');
    h1.appendChild(content);
    document.getElementById('ageInDaysId').appendChild(h1);
}

function reset() {
    document.getElementById('newly-added-h1').remove();
    //document.getElementById('ageInDaysId').innerHTML = '';
}