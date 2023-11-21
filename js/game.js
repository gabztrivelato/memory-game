const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const popupElement = document.querySelector('.popup');
const msgElement = document.querySelector('.popup_msg');
const timeElement = document.querySelector('.popup_time');
const bestTimeElement = document.querySelector('.popup_bestTime');
const btnStartOver = document.querySelector('.startOver');

btnStartOver.addEventListener('click', () => {
    location.reload();
});

const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
];

const createElement = (tag,className) => {
 const element = document.createElement(tag);
 element.className = className;
 return element;
}

let firstCard = '';
let secondCard = '';
const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length == 20){
        clearInterval(this.loop);
        popupElement.classList.remove('closed');
        msgElement.innerHTML = `Parabéns, ${spanPlayer.innerHTML}!`;
        timeElement.innerHTML = `Tempo: ${timer.innerHTML}`;

    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter){

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard ='';

        checkEndGame();

    }else{

        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard ='';

        },700)

    }
}

const revealCard = ( {target} ) => {

    if (target.parentNode.className.includes('reveal-card')){
        return;
    }

    if (firstCard == ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard == ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }

    
}

const createCard = (character) => {

    const card = createElement('div','card');
    const front = createElement('div','face front');
    const back = createElement('div','face back');

    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {
    const duplicateCharacters = [ ...characters, ...characters ];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {

        const card = createCard(character);
        grid.appendChild(card);

    });
}

const startTimer = () => {
    
    let sec = 0;
    let min = 0;
    this.loop = setInterval(() => {
        sec = sec + 1;

        if (sec <= 9){
            timer.innerHTML = min + ':' + '0' + sec;
        }else{
            timer.innerHTML = min + ':' + sec;
        }
        if (sec == 60){
            min = min + 1;
            sec = 0;
        }
        

    }, 1000);

}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}
