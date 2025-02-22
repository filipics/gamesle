// Game configuration
const targetEquation = "4+3=7"; // Set the target equation here
const maxAttempts = 6;
let attempts = 0;

// DOM elements
const board = document.getElementById("board");
const input = document.getElementById("guess-input");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submit-btn");

// Ensure input length matches the target equation length
input.maxLength = targetEquation.length;

submitBtn.addEventListener("click", () => {
  const guess = input.value.trim();

  // Check guess length
  if (guess.length !== targetEquation.length) {
    message.textContent = `Equation must be ${targetEquation.length} characters long.`;
    return;
  }

  // Check format: exactly one '=' sign
  if (!isValidFormat(guess)) {
    message.textContent = `Equation must contain one '=' sign.`;
    return;
  }

  // Validate the mathematical equation
  if (!evaluateEquation(guess)) {
    message.textContent = `The equation is not mathematically valid.`;
    return;
  }

  attempts++;
  const feedback = getFeedback(guess, targetEquation);
  addGuessToBoard(guess, feedback);

  if (guess === targetEquation) {
    message.textContent = "Congratulations! You solved it!";
    endGame();
  } else if (attempts >= maxAttempts) {
    message.textContent = `Game Over! The correct equation was ${targetEquation}.`;
    endGame();
  } else {
    message.textContent = `Attempt ${attempts} of ${maxAttempts}.`;
  }

  input.value = "";
  input.focus();
});

// Check that the equation contains exactly one '='
function isValidFormat(eq) {
  return (eq.split("=").length - 1) === 1;
}

// Evaluate whether the left-hand side equals the right-hand side
function evaluateEquation(eq) {
  const parts = eq.split("=");
  if (parts.length !== 2) return false;
  try {
    const left = eval(parts[0]);
    const right = eval(parts[1]);
    return left === right;
  } catch (error) {
    return false;
  }
}

// Compare the guess to the target and return feedback for each character
function getFeedback(guess, target) {
  let feedback = new Array(guess.length).fill("gray");
  let targetChars = target.split("");
  let guessChars = guess.split("");

  // First pass: mark characters in the correct position (green)
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === targetChars[i]) {
      feedback[i] = "green";
      targetChars[i] = null; // Remove matched character
    }
  }

  // Second pass: mark characters that exist in target but in a different position (yellow)
  for (let i = 0; i < guessChars.length; i++) {
    if (feedback[i] === "green") continue;
    let index = targetChars.indexOf(guessChars[i]);
    if (index !== -1) {
      feedback[i] = "yellow";
      targetChars[index] = null;
    }
  }

  return feedback;
}

// Add the guess row with color-coded cells to the board
function addGuessToBoard(guess, feedback) {
  const row = document.createElement("div");
  row.className = "row";
  for (let i = 0; i < guess.length; i++) {
    const cell = document.createElement("div");
    cell.className = "cell " + feedback[i];
    cell.textContent = guess[i];
    row.appendChild(cell);
  }
  board.appendChild(row);
}

// Disable further input when the game ends
function endGame() {
  submitBtn.disabled = true;
  input.disabled = true;
}
