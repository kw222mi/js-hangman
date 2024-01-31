let wordToGuess = [
    'cat',
    'dog',
    'hamster',
    'parrot',
]

let theWordToGuess = []
let userGuess = []
let gameOver = false

function newWordToGuess () {
    let random = getRandomInt(wordToGuess.length);
    let word = wordToGuess[random]
    console.log(word)

    theWordToGuess = word.split(""); 
    userGuess = Array.from(word, () => "_");
    console.log(userGuess)
    let numberOfLetters = word.length
    console.log(numberOfLetters)

    renderEmptyWord(numberOfLetters);
    startGame()
}


function renderEmptyWord(numberOfLetters) {
  let wordPlace = document.querySelector("#the-word-to-guess");
  console.log(wordPlace);

  let element = document.createElement("div");
  element.innerText = "_ ".repeat(numberOfLetters).trim();
  wordPlace.appendChild(element);
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function startGame () {
    console.log('started')

    // while word to guess != user guess && game over = false, let user guess
}

newWordToGuess();