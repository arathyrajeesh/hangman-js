const words = ['apple', 'banana', 'orange', 'grapes', 'strawberry', 'cherry'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let attempts = 6;

const wordDisplay = document.getElementById("wordDisplay");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const guessedLettersDisplay = document.getElementById("guessedLetters");
const attemptsDisplay = document.getElementById("attempts");

function updateDisplay() {
    let display = "";
    for (let letter of selectedWord) {
        display += guessedLetters.includes(letter) ? letter : " _ ";
    }
    wordDisplay.textContent = display.trim();
    guessedLettersDisplay.textContent = "Guessed Letters: " + guessedLetters.join(', ');
    attemptsDisplay.textContent = attempts;
}

guessBtn.addEventListener("click", () => {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = "";
    message.textContent = "";
    
    if (!guess || guess.length !== 1 || !/[a-z]/.test(guess)) {
        message.textContent = "Please enter a valid single letter.";
        return;
    }
    
    if (guessedLetters.includes(guess)) {
        message.textContent = "You already guessed that letter!";
        return;
    }
    guessedLetters.push(guess);
    
    if (selectedWord.includes(guess)) {
        message.textContent = "Correct guess!";
    } else {
        message.textContent = "Incorrect guess!";
        attempts--;
    }
    updateDisplay();
    
    if (!wordDisplay.textContent.includes('_')) {
        message.textContent = "🎉 Congratulations! You guessed the word: " + selectedWord;
        message.style.color = "red";
        document.getElementById("winModal").style.display = "block";
        guessBtn.disabled = true;
        guessInput.disabled = true;
    }
    
    if (attempts === 0) {
        message.textContent = " Out of attempts! The word was: " + selectedWord;
        message.style.color = "red"; 
        guessBtn.disabled = true;
        guessInput.disabled = true;
    }
});

updateDisplay();
