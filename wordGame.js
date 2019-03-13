var $newGameButton = document.getElementById("new-game-button");
var $placeholders = document.getElementById("placeholders");
var $guessedLetters = document.getElementById("guessed-letters");
var $guessesLeft = document.getElementById("guesses-left");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");

var wordBank = [
  "Eleanor",
  "Chidi",
  "Michael",
  "Janet",
  "Jortles",
  "All knowing burrito",
  "What the fork",
  "Tahani",
  "Jason",
  "What we owe each other",
  "This is why everyone hates Ethics teachers",
  "Derek"
];

var wins = 0;
var losses = 0;
var guessesLeft = 10;
var gameRunning = false;
var pickedWord = "";
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

function newGame() {
  //reset game info
  gameRunning = true;
  guessesLeft = 10;
  guessedLetterBank = [];
  incorrectLetterBank = [];
  pickedWordPlaceholderArr = [];

  //pick a new word

  pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

  //create placeholders
  for (var i = 0; i < pickedWord.length; i++) {
    if (pickedWord[i] === " ") {
      pickedWordPlaceholderArr.push(" ");
    } else {
      pickedWordPlaceholderArr.push("_");
    }
  }

  // write to DOM

  $guessesLeft.textContent = guessesLeft;
  $placeholders.textContent = pickedWordPlaceholderArr.join("");
  $guessedLetters.textContent = incorrectLetterBank;
}

//letter guess function
function letterGuess(letter) {
  console.log(letter);

  if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
    // run game logic
    guessedLetterBank.push(letter);

    //check if guessed letter is in my picked word

    for (var i = 0; i < pickedWord.length; i++) {
      if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
        pickedWordPlaceholderArr[i] = pickedWord[i];
      }
    }
    $placeholders.textContent = pickedWordPlaceholderArr.join("");
    checkIncorrect(letter);
  } else {
    if (!gameRunning) {
      alert("The game is not running, click new game");
    } else {
      alert("You've already guessed this letter");
    }
  }
}

function checkIncorrect(letter) {
  if (
    pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 &&
    pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1
  ) {
    guessesLeft--;
    incorrectLetterBank.push(letter);
    $guessedLetters.textContent = incorrectLetterBank.join(" ");
    $guessesLeft.textContent = guessesLeft;
  }
  checkLoss();
  checkWin();
}

function checkLoss() {
  if (guessesLeft === 0) {
    losses++;
    gameRunning = false;
    $losses.textContent = losses;
    
  }
}

function checkWin() {
    if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join('').toLowerCase())
    {
        
        wins++;
        gameRunning = false;
        $wins.textContent = wins;
        
    }
}

$newGameButton.addEventListener("click", newGame);

document.onkeyup = function(event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    letterGuess(event.key);
  }
};
