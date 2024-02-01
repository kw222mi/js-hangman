let theWordToGuess = [];
let userGuess = [];
let numberOfGuesses = 0;

let guess = document.getElementById("guess-form");
guess.addEventListener("submit", (e) => {
  handleUserGuess(e);
});

async function newWordToGuess() {
  let word = await getRandomWord();
  console.log(word);

  theWordToGuess = word.split("");
  userGuess = Array.from(word, () => "_");
  console.log(userGuess);
  let numberOfLetters = word.length;
  console.log(numberOfLetters);

  renderEmptyWord(numberOfLetters);
}

async function getRandomWord() {
  const response = await fetch(
    "https://random-word-api.vercel.app/api?words=1"
  );
  const movies = await response.json();
  console.log(movies[0]);
  return movies[0];
}

function renderEmptyWord(numberOfLetters) {
  let wordPlace = document.querySelector("#the-word-to-guess");
  console.log(wordPlace);

  let element = document.createElement("div");
  element.innerText = "_ ".repeat(numberOfLetters).trim();
  wordPlace.appendChild(element);
}

function handleUserGuess(e) {
  e.preventDefault();
  // Get the input inside the form
  let guessInput = guess.querySelector("#guess");
  // Get the value
  let guessValue = guessInput.value.toLowerCase();
  console.log("Guess:", guessValue);

  let check = checkTheGuess(guessValue);
  if (check === true ){
    let positions = getPositions(guessValue);
    updateUserGuess(positions, guessValue);
  }
  else {
    drawPicture(numberOfGuesses);

    numberOfGuesses = numberOfGuesses + 1;
    if (numberOfGuesses === 4) {
        console.log('game over')
    }
  }
}

function checkTheGuess(guessValue) {
  let check = theWordToGuess.includes(guessValue);
  console.log(check);
  return check
}

function getPositions(guessValue) {
  let positions = [];
  for (let i = 0; i < theWordToGuess.length; i++) {
    if (theWordToGuess[i] === guessValue) {
      positions.push(i);
    }
  }
  console.log(positions);
  return positions;
}

function updateUserGuess(positions, guessValue) {
  for (let i = 0; i < positions.length; i++) {
    userGuess[positions[i]] = guessValue;
  }
  updateVisualWord();
}

function updateVisualWord() {
  let wordPlace = document.querySelector("#the-word-to-guess");
  wordPlace.innerText = userGuess.join(" ");
}

function drawPicture(numberOfGuesses) {
    let path = document.querySelectorAll('path')
    console.log(path[numberOfGuesses])
    path[numberOfGuesses].classList.remove("nonvisible")

}

newWordToGuess();
