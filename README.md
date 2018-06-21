# Udacity-Memory-Game

## General
The memory game project is a matching game which challenges the player \
to find all the matching cards in the game as fast as possible.


## Goal of the game
The player has to memorize the position of all the cards in the game.\
The goal is to reveal all the cards in as little as possible flips(and time).


## Instructions
Flipover two cards on the deck to reveal their image (face up).\
If the images are not identical to each other, the cards will be flipped back (face down).\
When the cards do match, they don't flip back but stay visible\
The player has to keep flipping óver the cards until all cards are matched.


## Building the memory game
A deck of cards is created in html and CSS, that will be manipulated by (vanilla)javascript.\


## Dependencies
The memorygame makes use of the icons from (Bootstrap)font-Awesome, 
and uses fonts from the google-fonts API.


1.HTML\
The HTML documents contains three important sections:\
Score-panel where you can check the number of moves, time and star-rating.\
Card-Deck, an unordered list containing all the cards.\
Winner-panel which is only visible when completing the game.\
2.CSS\
The CSS code gives the game it's funny style, makes it responsive, and adds some animation\
when the cards are flipped and match or do not match.\
3. Javascript\
There is a shuffle function that shuffles all cards when a new game is created.\
The newGame function resets all scores, times and stars. it will be executed by triggering the Restart Game button.\
The Playgame function checks if two cards are turned, if the cards match or do not match.\
It turns the cards back when mismatched and counts the numer of moves.\
It also checks if all cards are matched so a winner-screen pops up.\
The Rating function checks the number of moves and give according to the result the number of stars\
you’ve earned from 1 tot 3.\
The Winnerfunction collects the time-score, number of movers, and achieved stars.\
4. Design\
The emoticons on the cards are hand-drawn and digitalized with Adobe Illustrator. 
