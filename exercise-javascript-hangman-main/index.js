
let theWordToGuess = []
let userGuess = []
let gameOver = false

async function newWordToGuess () {
    let word = await getRandomWord();;
   console.log(word)

    theWordToGuess = word.split(""); 
    userGuess = Array.from(word, () => "_");
    console.log(userGuess)
    let numberOfLetters = word.length
    console.log(numberOfLetters)

    renderEmptyWord(numberOfLetters);
    startGame()
}

 async function getRandomWord() {
   const response = await fetch(
     "https://random-word-api.vercel.app/api?words=1"
   );
   const movies = await response.json();
   console.log( movies[0]);
   return movies[0]
 }

function renderEmptyWord(numberOfLetters) {
  let wordPlace = document.querySelector("#the-word-to-guess");
  console.log(wordPlace);

  let element = document.createElement("div");
  element.innerText = "_ ".repeat(numberOfLetters).trim();
  wordPlace.appendChild(element);
}

function startGame () {
    console.log('started')

    // while word to guess != user guess && game over = false, let user guess
}

newWordToGuess();