/*
 * Create a list that holds all of your cards
 */

const cards = ['yoyoLaugh', 'yoyoLaugh',
    'cici', 'cici',
    'yoyoCute', 'yoyoCute',
    'yoyoShy', 'yoyoShy',
    'yoyo2', 'yoyo2',
    'yoyoEat', 'yoyoEat',
    'handFan', 'handFan',
    'babyYoyo', 'babyYoyo',
];
/*
 * Creat a cards
 */
function generateCard(card) {
    return `<div class ="card" data-name="${card}"> 
    <img class="front-face" src="img/${card}.gif" alt="box image" > 
    <img class="back-face" src="img/block.png" alt="box image" >
    </div>`;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * Timer 
 */
const timerSpan = document.querySelector('.timer');
let timeCounter = 0;
let time;

function timerCount() {
    timerSpan.textContent = timeCounter;
    timeCounter = timeCounter + 1;
    time = setTimeout(timerCount, 1000);
}

function initGame() {
    const deck = document.querySelector('.deck');
    const cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });

    deck.innerHTML = cardHTML.join('');
}

initGame();



const allCards = document.querySelectorAll('.card');
//to hold all matchCards
let matchCards = [];
// to check if the cards click
let hasOpenCard = false;
// to holding the cards are opening
let firstCard, secondCard;
// to lock the cards clicks
let lockCards = false;
//Counter 
let moveCounter = 0;
const moves = document.querySelector('.moves');
//Restart The Game
const restartbutton = document.querySelector('.restart');
restartbutton.addEventListener('click', restart);
// To Start the timer 
let isGameStart = false;


// Add Cards listener
allCards.forEach(card => card.addEventListener('click', openCard));

// function Open Card 
function openCard() {
    let card = this;
    if (!isGameStart) {
        //start the timer
        timerCount();
        isGameStart = true;
    }

    if (lockCards)
        return;
    // check if it the same cards
    if (card === firstCard)
        return;

    // To Display a image 
    card.classList.add('open');



    if (!hasOpenCard) {
        //first click
        hasOpenCard = true;
        firstCard = card;
    } else {
        //second click
        hasOpenCard = false;
        secondCard = card;

        //Check if they match 
        match();
    }
    // update the number of Move 
    movesCounter();
    // update the stars
    stars();
}

/**
 * Function check if the cards are matching
 */
function match() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        //matching
        firstCard.removeEventListener('click', openCard);
        secondCard.removeEventListener('click', openCard);
        //add to list
        matchCards.push(firstCard, secondCard);
        // check if the games end 
        if (matchCards.length === 16)
            youWon();
    } else {
        //lock the cards clicks
        lockCards = true;
        // not matching
        setTimeout(() => {
            firstCard.classList.remove('open');
            secondCard.classList.remove('open');
            //open the cards clicks
            lockCards = false;
        }, 1500);
    }
}

/**
 * Function Moves counter
 */
function movesCounter() {
    moveCounter = moveCounter + 1;
    moves.textContent = moveCounter;
}

/**
 * Function Update the stars
 */
//Stars
const starsUl = document.querySelector('.stars');
let startOneRemove = false;
let startTwoRemove = false;

function stars() {
    if (!startOneRemove && moveCounter > 20) {
        // lose one star
        starsUl.children[0].innerHTML = "";
        startOneRemove = true;
    } else if (!startTwoRemove && moveCounter > 40) {
        //lose two stars   
        starsUl.children[1].innerHTML = "";
        startTwoRemove = true;
    } else {
        return;
    }
}

/** 
 * Function run when the player won
 */
function youWon() {
    //Stop the timer
    clearTimeout(time);
    //Show the Modal
    const modal = document.querySelector('.modal');
    const timeUp = document.querySelector('.timesUp');
    const starDiv = document.querySelector('.star');
    const playAgain = document.querySelector('.playAgain')
    modal.style.display = "block";
    timeUp.textContent = timeCounter;
    starDiv.appendChild(starsUl);
    playAgain.addEventListener('click', restart);

}
/**
 * Function Rest the game
 */

function restart() {
    // restart the game
    location.reload();
}