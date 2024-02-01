let theWordToGuess = [];
let userGuess = [];
let gameOver = false;

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
  let guessValue = guessInput.value;
  console.log("Guess:", guessValue);

  checkTheGuess(guessValue);
}

function checkTheGuess(guessValue) {
  let check = theWordToGuess.includes(guessValue);
  console.log(check);
}

newWordToGuess();
