/*-------Global variables---------*/

let theWordToGuess = [];
let userGuess = [];
let numberOfGuesses = 0;
let allGuessedLetters = [];
const modal = document.getElementById("myModal");

/*--------Eventlisteners--------*/

let guess = document.getElementById("guess-form");
// Get the guess from the form
guess.addEventListener("submit", (e) => handleUserGuess(e));

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

/*------------Functions---------*/

const newWordToGuess = async () => {
  cleanUpTheBoard();
  let word = await getRandomWord();
  console.log(word);
  theWordToGuess = word.split("");
  userGuess = Array.from(word, () => "_");
  renderEmptyWord(word.length);
};

const getRandomWord = async () => {
  const response = await fetch(
    "https://random-word-api.vercel.app/api?words=1"
  );
  const word = await response.json();
  return word[0];
};

const renderEmptyWord = (numberOfLetters) => {
  let wordPlace = document.querySelector("#the-word-to-guess");
  wordPlace.innerHTML = ""; // Clear existing content
  let element = document.createElement("div");
  element.setAttribute("class", "empty-word")
  element.innerText = "_ ".repeat(numberOfLetters).trim();
  wordPlace.appendChild(element);
};

const handleUserGuess = (e) => {
  e.preventDefault();
  let guessInput = guess.querySelector("#guess"); // Get the input inside the form
  let guessValue = guessInput.value.toLowerCase(); // Get the value
  guessInput.value = "";
  let check = checkTheGuess(guessValue);

  if (check === true) {
    let positions = getPositions(guessValue);
    updateUserGuess(positions, guessValue);
    addToGuessedLetters(guessValue);
  }
  if (check === false) {
    addToGuessedLetters(guessValue);
    drawPicture(numberOfGuesses);
    numberOfGuesses = numberOfGuesses + 1;
    if (numberOfGuesses === 5) {
      let result = "loose";
      presentResult(result);
    }
  }
  if (check === null) {
    modal.querySelector("p").innerText = `The letter is already used.`;
    modal.style.display = "block";
    let modalContent = modal.querySelector(".modal-content");
  }
};

const checkTheGuess = (guessValue) => {
  let usedLetter = allGuessedLetters.includes(guessValue); //Check if letter is used
  if (usedLetter === false) {
    let check = theWordToGuess.includes(guessValue);
    return check;
  } else {
    return null; // Return null if the letter is used
  }
};

const addToGuessedLetters = (guessValue) => {
  allGuessedLetters.push(guessValue);
  let allGuessedLettersString = allGuessedLetters.join("");
  let guessedLetters = document.querySelector("#guessed-letters");
  guessedLetters.innerHTML = "";  // clean last render
  let element = document.createElement("div");
  element.setAttribute("class", "guessed-letters")
  element.innerText = allGuessedLettersString;
  guessedLetters.appendChild(element);
};

const getPositions = (guessValue) => {
  let positions = [];
  for (let i = 0; i < theWordToGuess.length; i++) {
    if (theWordToGuess[i] === guessValue) {
      positions.push(i);
    }
  }
  return positions;
};

const updateUserGuess = (positions, guessValue) => {
  for (let i = 0; i < positions.length; i++) {
    userGuess[positions[i]] = guessValue;
  }
  updateVisualWord();
  checkIfWinner();
};

const updateVisualWord = () => {
  let wordPlace = document.querySelector("#the-word-to-guess");
  wordPlace.innerText = userGuess.join(" ");
};

const drawPicture = (numberOfGuesses) => {
  let path = document.querySelectorAll("path");
  let ellipse = document.querySelector("ellipse");

  if (numberOfGuesses < 5) {
    path[numberOfGuesses].classList.remove("nonvisible");
  } else {
    ellipse.classList.remove("nonvisible");
  }
};

const checkIfWinner = () => {
  const str1 = theWordToGuess.join("");
  const str2 = userGuess.join("");
  if (str1 === str2) {
    presentResult(true);
  }
};

const presentResult = (result) => {
  if (result === "loose") {
    modal.querySelector(
      "p"
    ).innerText = `You Loose!, The word was:  ${theWordToGuess.join("")}`;
    modal.style.display = "block";
    let modalContent = modal.querySelector(".modal-content");
    addButtonForNewGame(modalContent);
  } else {
    modal.querySelector(
      "p"
    ).innerText = `You Win!, The word was:  ${theWordToGuess.join("")}`;
    modal.style.display = "block";
    let modalContent = modal.querySelector(".modal-content");
    addButtonForNewGame(modalContent);
  }
};

const addButtonForNewGame = (modalContent) => {
  let btn = document.createElement("button");
  btn.innerText = "New game";
  btn.setAttribute("class", "button")
  modalContent.appendChild(btn);

  btn.addEventListener("click", () => {
    newWordToGuess();
    modal.style.display = "none";
    btn.remove();
  });
};

const cleanUpTheBoard = () => {
  allGuessedLetters = [];
  theWordToGuess = [];
  userGuess = [];
  numberOfGuesses = 0;
  renderEmptyWord(0);
  document.querySelector("#guessed-letters").innerText = "";
  let path = document.querySelectorAll("path");
  let ellipse = document.querySelector("ellipse");
  path.forEach((element) => element.classList.add("nonvisible"));
  ellipse.classList.add("nonvisible");
};

/*------Start the game---------*/
newWordToGuess();


