const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
// creating keyboard button dynamically
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
let currentWord, wrongGuessCount;
let correctLetters;
const maxGuesses = 6;
const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `images/hangman-{wrongGuessCount}.png`;
  guessesText.innerText = `${wrongGuessCount}/${maxGuesses}`;
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  keyboardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
  gameModal.classList.remove("show");
};

// selecting random word and hint from wordlist
const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  // To display word and hint on page
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
  wordDisplay.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    //update model content according to game status
    const modalText = isVictory
      ? `You found the word:`
      : `The correct word was:`;
    gameModal.querySelector("img").src = `images/${
      isVictory ? "victory" : "lost"
    }.gif`;
    gameModal.querySelector("h4").innerText = `${
      isVictory ? "Congrats!" : "Game Over!"
    }`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;

    gameModal.classList.add("show");
  }, 300);
};
const initGame = (button, clickedLetter) => {
  // checking if clicked letter exist in currentword
  if (currentWord.includes(clickedLetter)) {
    // showing all correct letters on the word display
    //loop at current word
    [...currentWord].forEach((letter, index) => {
      if (letter == clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add = "guessed";
      }
    });
    // if clicked letter dont exist
    // upadte wrong guess count and hangman image
  } else {
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.png`;
  }
  // disabled the button so that same button can't be clicked again
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount}/${maxGuesses}`;
  // showing gameover model on victory
  // calling gameover fn if any of these functions meet
  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};
// creating keyboard buttons & adding Event listiner
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  // putting button in keyboard
  keyboardDiv.appendChild(button);
  // To check clicked letter exist in word or not
  // example if word is apple to check p exist in word
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
