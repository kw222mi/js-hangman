let theWordToGuess = [];
let userGuess = [];
let numberOfGuesses = 0;
let allGuessedLetters = []
const modal = document.getElementById("myModal");

let guess = document.getElementById("guess-form");
guess.addEventListener("submit", (e) => handleUserGuess(e));

const newWordToGuess = async () => {
  cleanUpTheBoard()
  let word = await getRandomWord();
  console.log(word);

  theWordToGuess = word.split("");
  userGuess = Array.from(word, () => "_");
  let numberOfLetters = word.length;

  renderEmptyWord(numberOfLetters);
};

const cleanUpTheBoard = () => {
  allGuessedLetters = [];
  theWordToGuess = [];
  userGuess = [];
  numberOfGuesses = 0;
  console.log(allGuessedLetters)
  renderEmptyWord(0);
  document.querySelector("#guessed-letters").innerText = "";
}


const getRandomWord = async () => {
  const response = await fetch(
    "https://random-word-api.vercel.app/api?words=1"
  );
  const word = await response.json();
  return word[0];
};

const renderEmptyWord = (numberOfLetters) => {
  let wordPlace = document.querySelector("#the-word-to-guess");
  // Clear existing content
  wordPlace.innerHTML = "";

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

  let check = checkTheGuess(guessValue);

  if (check === true) {
    let positions = getPositions(guessValue);
    updateUserGuess(positions, guessValue);
    addToGuessedLetters(guessValue);
  } if (check === false ) {
    addToGuessedLetters(guessValue);
    drawPicture(numberOfGuesses);
    numberOfGuesses = numberOfGuesses + 1;
    if (numberOfGuesses === 5) {
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
  
  let check = theWordToGuess.includes(guessValue);
  // console.log(check);
  return check;
  }
  else {
    return null
  }
};

const addToGuessedLetters = (guessValue) => {
  allGuessedLetters.push(guessValue);
  let allGuessedLettersString = allGuessedLetters.join("");
  let guessedLetters = document.querySelector("#guessed-letters");

  guessedLetters.innerHTML=''

  let element = document.createElement("div");
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

  if (numberOfGuesses<5) {
  path[numberOfGuesses].classList.remove("nonvisible");
  }
  else {
    ellipse.classList.remove("nonvisible");
  }
};

const checkIfWinner = () => {
   console.log("Inside checkIfWinner");
    
  const str1 = theWordToGuess.join("");
  const str2 = userGuess.join("");

   console.log(str1 );
    console.log( str2);
  console.log( str1 === str2)
  if (str1 === str2) {
    presentResult(true);
  }

}

const presentResult = (result) => {
    if( result === 'loose') {
        modal.querySelector("p").innerText = `You Loose!, The word was:  ${theWordToGuess.join("")}`;
        modal.style.display = "block";

        let modalContent = modal.querySelector('.modal-content')
        let btn = document.createElement("button");
        btn.innerText = 'New game'
        modalContent.appendChild(btn);
        btn.addEventListener("click", () => newWordToGuess());
    }
    else {
        modal.querySelector("p").innerText = `You Win!, The word was:  ${theWordToGuess.join("")}`;
        modal.style.display = "block";

           let modalContent = modal.querySelector(".modal-content");
           let btn = document.createElement("button");
           btn.innerText = "New game";
           modalContent.appendChild(btn);
           btn.addEventListener("click", () => {
            newWordToGuess()
            modal.style.display = "none"
          });
}
}

let span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

newWordToGuess();

// style
// input focus
// clean modal button?
