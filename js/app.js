//declaration of the deck variables and Event Listener(s)
const deck = document.querySelector("ul.deck");
const list = document.querySelectorAll('.deck li')
deck.addEventListener("click", playGame);
let mismatch = document.querySelectorAll('.deck .mismatch .emoji');

//declaration of the score variables and Event Listener(s)
const restart = document.querySelector(".restart");
const moves = document.querySelector(".moves");
const stars = document.getElementById("score");
restart.addEventListener("click", newGame);
const saveStars = document.getElementById('score').innerHTML;
let compareArray = []; //Array to compare if two cards have the same smiley
let winnerArray = []; //Array to check if all cards are have the class match
let counter;
let card;

//declaration of the timing variables
const displayTime = document.querySelector('#display');
let sec;
let min;
let timerStatus = 1;
let timeOut;

//declaration of the winner-"pop-up" varibles and Event Listener(s)
var winner = document.getElementById('winner');
var closebutton = document.getElementById('close');
closebutton.addEventListener('click', closing);



//newGame function creates a new Game
function newGame() {
    //resetting, timers,scores=0, arrays empty, three stars
    counter = 0;
    winnerArray = [];
    stars.innerHTML = saveStars;
    moves.innerHTML = counter;
    const shuffleArray = [];
    sec = 0;
    min = 0;
    timerStatus = 1;
    timer();
    //loop pushes the nodelist into shuffleArray
    for (let i = 0; i < list.length; i++) {
        shuffleArray.push(list[i]);
    }
    shuffle(shuffleArray); //calls shuffle-function with shuffleArray as Parameter
    deck.innerHTML = ""; //clears the deck
    //loop appends all (shuffled) LI-elements to the deck
    for (let j = 0; j < shuffleArray.length; j++) {
        shuffleArray[j].className = 'card';
        deck.appendChild(shuffleArray[j]);
    }
}



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



/*Playgame function checks if: cards are turned, two cards are turned,
cards match, all cards match; counts the moves;
 */
function playGame(event) {
    event.preventDefault();
    //check if cards are triggered
    if (event.target.nodeName == 'LI') {
        const x = event.target;
        const y = event.target.children[0];
        const clickSound = new sound('sounds/click.ogg');
        const matchSound = new sound('sounds/match.ogg');
        //check if cards are not already matched
        if (x.className != 'card match') {
            compareArray.push(y.className);
            x.className = 'card open show';
            clickSound.play();
            //check if two cards are showed
            if (compareArray.length == 2) {
                counter += 1;
                rating();
                moves.innerHTML = counter;
                //check if the two cards are mismatched
                if (compareArray[0] != compareArray[1]) {
                    card = 'card mismatch';
                    compareArray = [];
                    setTimeout(misMatch, 1000);
                    turnCards();
                } else {
                    //cards match and className is set to Match
                    card = 'card match';
                    matchSound.play();
                    winnerArray.push("match"); //when matched the array is incremented by 1
                    compareArray = [];
                    turnCards();
                    //check if all cards(8 pairs) in the deck are matched
                    if (winnerArray.length >= 8) {
                        timerStatus = 0;
                        setTimeout(winning, 300);
                    }
                }
            }
        }
    }
}

//misMatch function turns cards back when mismatched
function misMatch() {
    const misCard = document.querySelectorAll('.mismatch');
    misCard[0].className = 'card';
    misCard[1].className = 'card';
}


//turnCards function adds the value of the card-variable to the opencard
function turnCards() {
    const openCard = document.querySelectorAll('.open');
    openCard[0].className = card;
    openCard[1].className = card;
}


//timer function
function timer() {
    clearTimeout(timeOut);
    timeOut = setTimeout(function() {
        if (timerStatus == 1) {
            if (sec <= 9) {
                displayTime.innerHTML = min + ":" + "0" + sec;
            } else {
                displayTime.innerHTML = min + ":" + sec;
            }
            sec += 1;
            if (sec == 60) {
                min += 1;
                sec = 0;
            }
            if (min == 10) {
                TimerStatus = 0;
                alert("time's up!")
                sec = 0;
            }
        }
        timer();
    }, 1000);
}

//rating function checks number of moves and removes a star when a certain value is reached
function rating() {
    if (counter == 23) {
        stars.removeChild(stars.children[0]);
    } else if (counter == 17) {
        stars.removeChild(stars.children[1]);
    }
}

//winning function makes the #winner(div) visible which shows all the results
function winning() {
    const results = document.querySelector('.winnertext');
    const starRating = document.querySelector('.winnerlist');
    const winsound = new sound('sounds/win.mp3');
    winsound.play();
    winner.style.display = "block";
    results.innerHTML = 'Total moves:' + moves.innerHTML + "<br />" + " Total time: " + displayTime.textContent;
    starRating.innerHTML = document.getElementById('score').innerHTML;
};



//function closing closes the winner-pop-up, so you can restart the game (or admire the emoticons :);
function closing(event) {
    event.preventDefault;
    winner.style.display = "none";
};



//function sound is an object constructor which all the (new)sound-objects
//inherits it's properties from
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
}

newGame();
