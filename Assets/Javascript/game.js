// CREATE VARIABLES AND REFERENCES TO DOM ELEMENTS

// dom elements
var newGameButtonHTML = document.getElementById("new-game");
var placeholdersHTML = document.getElementById("placeholders");
var incorrectLettersHTML = document.getElementById("incorrect-letters");
var winsHTML = document.getElementById("wins-count");
var lossesHTML = document.getElementById("losses-count");
var guessesLeftHTML = document.getElementById("guesses-left");

// logical game variables
// wordBank is in other file

// wins & losses
var wins = 0;
console.log(wins);
var losses = 0;

// guessesLeft integer (will be reset upon new game start)
var guessesLeft = 8;

// gameRunning flag for our logic
var gameRunning = false;

// picked word holder
var pickedWord = "";
// placeholder array
var pickedWordPlaceholderArray = [];

// guessedLetterBank
var guessedLetterBank = [];

// for display purposes
var incorrectLetterBank = [];


// function for new/resetting the game
function newGame() {
  // reset all game variables
  gameRunning = true;
  guessesLeft = 8;
  guessedLetterBank = [];
  incorrectLetterBank = [];
  pickedWordPlaceholderArray = [];

  // pick a new word
  pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  console.log(pickedWord);

  // create placeholders from picked word
  for (var i = 0; i < pickedWord.length; i++) {
    if (pickedWord[i] === " ") {
      pickedWordPlaceholderArray.push(" ");
    } else {
      pickedWordPlaceholderArray.push("_");
    }
  }
  console.log(pickedWordPlaceholderArray);

  // WRITE INFO TO THE PAGE
  // guessesLeft
  guessesLeftHTML.textContent = guessesLeft;
  // placeholders
  placeholdersHTML.textContent = pickedWordPlaceholderArray.join(" ")
  // incorrectLetterBank
  incorrectLettersHTML.textContent = incorrectLetterBank;
}


// function for checking a guessed letter
function letterGuess(letter) {
  console.log(letter);
  // check to see if letter has been guessed prior, if no run with game logic
  if (guessedLetterBank.includes(letter) === false) {
    // run game logic
    // add letter to letterBank
    guessedLetterBank.push(letter);

    // loop over pickedWord and see if any character matches letter I guessed
    for (var i = 0; i < pickedWord.length; i++) {
      // check if pickedWord[i] === letter
      if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
        // swap placeholderArray[i] with pickedWord[i]
        pickedWordPlaceholderArray[i] = pickedWord[i];
      }
    }
    // write placeholders to page to show user if they guessed it correct
    placeholdersHTML.textContent = pickedWordPlaceholderArray.join(" ")
    
    checkIncorrect(letter);

  } else {
    alert("You've already pressed this letter!");
  }
}


// function for checking if letter was incorrect
function checkIncorrect(letter) {
  // check if letter guessed didn't make it into our placeholder
  if (pickedWordPlaceholderArray.includes(letter) === false) {
    // decrement guessesLeft
    guessesLeft--;
    // push incorrect letter into incorrect letter bank
    incorrectLetterBank.push(letter);
    // write incorrect letter to page
    incorrectLettersHTML.textContent = incorrectLetterBank.join(" ");
    guessesLeftHTML.textContent = guessesLeft;
  }
  checkLoss();
}

// function for checking if user lost
function checkLoss() {
  if (guessesLeft <= 0) {
    losses++;
    gameRunning = false;
    lossesHTML.textContent = losses;
  }
  checkWin();
}

// function for checking if user won
function checkWin() {
  if (pickedWord.toLowerCase() === pickedWordPlaceholderArray.join("").toLowerCase()) {
    wins++;
    gameRunning = false;
    winsHTML.textContent = wins;
  }
}

// set up DOM event handlers (onkeyup & new game button click)
document.onkeyup = function(event) {
  // check to see if letter pressed is a-z
  if (event.keyCode >= 65 && event.keyCode <= 90 && gameRunning === true) {
    // run game logic
    letterGuess(event.key);
  } else {
    alert("Press something that's a-z or start a new game!");
  }
}

newGameButtonHTML.addEventListener("click", newGame);