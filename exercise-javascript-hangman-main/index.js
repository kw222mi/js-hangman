let theWordToGuess = [];
let userGuess = [];
let numberOfGuesses = 0;
let allGuessedLetters = []

let guess = document.getElementById("guess-form");
guess.addEventListener("submit", (e) => handleUserGuess(e));

const newWordToGuess = async () => {
  let word = await getRandomWord();
  console.log(word);

  theWordToGuess = word.split("");
  userGuess = Array.from(word, () => "_");
  console.log(userGuess);
  let numberOfLetters = word.length;
  console.log(numberOfLetters);

  renderEmptyWord(numberOfLetters);
};

const getRandomWord = async () => {
  const response = await fetch(
    "https://random-word-api.vercel.app/api?words=1"
  );
  const movies = await response.json();
  console.log(movies[0]);
  return movies[0];
};

const renderEmptyWord = (numberOfLetters) => {
  let wordPlace = document.querySelector("#the-word-to-guess");
  console.log(wordPlace);

  let element = document.createElement("div");
  element.innerText = "_ ".repeat(numberOfLetters).trim();
  wordPlace.appendChild(element);
};

const handleUserGuess = (e) => {
  e.preventDefault();
  // Get the input inside the form
  let guessInput = guess.querySelector("#guess");
  // Get the value
  let guessValue = guessInput.value.toLowerCase();
  guessInput.value= ''
  console.log("Guess:", guessValue);

  let check = checkTheGuess(guessValue);

  if (check === true) {
    let positions = getPositions(guessValue);
    updateUserGuess(positions, guessValue);
  } if (check === false ) {
    drawPicture(numberOfGuesses);
    numberOfGuesses = numberOfGuesses + 1;
    if (numberOfGuesses === 5) {
      console.log("game over");
      let result = 'loose'
      presentResult(result)
    }
  }
  if(check === null) {
    console.log('letter already used!!')
  }
};

const checkTheGuess = (guessValue) => {
  let usedLetter = allGuessedLetters.includes(guessValue);
  if (usedLetter === false){
  addToGuessedLetters(guessValue);
  let check = theWordToGuess.includes(guessValue);
  console.log(check);
  return check;
  }
  else {
    return null
  }
};

const addToGuessedLetters = (guessValue) => {
   
    allGuessedLetters.push(guessValue)
    console.log(allGuessedLetters);
    allGuessedLettersString = allGuessedLetters.join("");

    let guessedLetters = document.querySelector('#guessed-letters')
     guessedLetters.innerHTML = "";
    let element = document.createElement("div");
    element.innerText = allGuessedLettersString;
     guessedLetters.appendChild(element);
}

const getPositions = (guessValue) => {
  let positions = [];
  for (let i = 0; i < theWordToGuess.length; i++) {
    if (theWordToGuess[i] === guessValue) {
      positions.push(i);
    }
  }
  console.log(positions);
  return positions;
};

const updateUserGuess = (positions, guessValue) => {
  for (let i = 0; i < positions.length; i++) {
    userGuess[positions[i]] = guessValue;
  }
  updateVisualWord();
};

const updateVisualWord = () => {
  let wordPlace = document.querySelector("#the-word-to-guess");
  wordPlace.innerText = userGuess.join(" ");
};

const drawPicture = (numberOfGuesses) => {
  let path = document.querySelectorAll("path");
  let ellipse = document.querySelector("ellipse");

  if (numberOfGuesses<5) {
  console.log(path[numberOfGuesses]);
  path[numberOfGuesses].classList.remove("nonvisible");
  }
  else {
    ellipse.classList.remove("nonvisible");
  }
};

const presentResult = (result) => {
    if( result === 'loose') {
        console.log('YOU LOOSE')
        console.log('The word was: ' + theWordToGuess.join(""))
    }
    else {
        console.log('YOU WIN!!')
    }

}

newWordToGuess();

// Game over (win or loose) and start again
// style
