/**************** Función auxiliar para rellenar con ceros ****************/
function pad(num, length) {
  return num.toString().padStart(length, '0');
}

/**************** Función hash ****************/
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

/**************** Función para generar la ecuación en modo diario usando un hash ****************/
function getDailyEquation() {
  const now = new Date();
  const dateStr = now.toDateString(); // Ej: "Wed Feb 26 2025"
  const seed = Math.abs(hashCode(dateStr));
  let eq;
  // Decidimos el operador según una parte del seed
  if ( (Math.floor(seed / 10000)) % 2 === 0 ) {
    // Modo suma:
    // A: 10 a 89 (2 dígitos)
    const A = (seed % 80) + 10; // valor entre 10 y 89
    // B: debe estar entre 10 y (99 - A) para que A+B tenga 2 dígitos
    const rangeB = (99 - A) - 10 + 1; // número de valores posibles
    const B = (Math.floor(seed / 100) % rangeB) + 10;
    const C = A + B; // Será entre 20 y 99
    eq = `${A}+${B}=${C}`;
  } else {
    // Modo resta:
    // A: 20 a 99 (2 dígitos)
    const A = (seed % 80) + 20; // valor entre 20 y 99
    // B: debe ser entre 1 y (A - 10) para que A-B tenga 2 dígitos
    const rangeB = A - 10; // valores de 1 a (A-10)
    const B = (Math.floor(seed / 100) % rangeB) + 1;
    const C = A - B; // Será entre 10 y (A-1)
    eq = `${A}-${B}=${C}`;
  }
  // Por construcción, eq tiene 8 caracteres (2+1+2+1+2)
  return eq;
}

/**************** Función para generar una ecuación aleatoria (modo normal) ****************/
function generateEquation() {
  const ops = ['+', '-'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let A, B, C;
  if (op === '+') {
    // Para suma: A entre 10 y 89; B entre 10 y (99 - A)
    A = Math.floor(Math.random() * (89 - 10 + 1)) + 10;
    const maxB = 99 - A;
    if (maxB < 10) return generateEquation();
    B = Math.floor(Math.random() * (maxB - 10 + 1)) + 10;
    C = A + B;
    if (C < 10 || C > 99) return generateEquation();
  } else { // Para resta: A entre 20 y 99; B entre 10 y (A - 10)
    A = Math.floor(Math.random() * (99 - 20 + 1)) + 20;
    const maxB = A - 10;
    if (maxB < 10) return generateEquation();
    B = Math.floor(Math.random() * (maxB - 10 + 1)) + 10;
    C = A - B;
    if (C < 10 || C > 99) return generateEquation();
  }
  return A.toString() + op + B.toString() + "=" + C.toString();
}

function getNormalEquation() {
  return generateEquation();
}

/**************** Variables Globales y Constantes ****************/
const MAX_ATTEMPTS = 6;
const EQUATION_LENGTH = 8;
let currentRow = 0;
let currentCol = 0;
let gameOver = false;
let targetEquation = "";
let isDailyMode = false;  // false: modo normal, true: modo diario

// Clave para guardar el estado en modo diario en localStorage
const DAILY_GAME_STATE_KEY = "dailyGameStateNerdle";

// Definición del teclado virtual
const numberKeys = ["1","2","3","4","5","6","7","8","9","0"];
const operatorKeys = ["+", "-", "="];
const specialKeys = ["enter", "delete"];
const allowedChars = "0123456789+-=";

/**************** DOM Elements ****************/
const boardElement = document.getElementById("board");
const messageElement = document.getElementById("message");
const keyboardNumbersElement = document.getElementById("keyboard-numbers");
const keyboardOperatorsElement = document.getElementById("keyboard-operators");
const keyboardSpecialElement = document.getElementById("keyboard-special");
const toggleModeButton = document.getElementById("toggle-mode");
const restartButton = document.getElementById("restart-game");

/**************** Funciones de Inicialización ****************/
function generateBoard() {
  boardElement.innerHTML = "";
  for (let row = 0; row < MAX_ATTEMPTS; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("board-row");
    for (let col = 0; col < EQUATION_LENGTH; col++) {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.id = `cell-${row}-${col}`;
      rowDiv.appendChild(cellDiv);
    }
    boardElement.appendChild(rowDiv);
  }
}

function generateKeyboard() {
  keyboardNumbersElement.innerHTML = "";
  keyboardOperatorsElement.innerHTML = "";
  keyboardSpecialElement.innerHTML = "";
  
  numberKeys.forEach(key => {
    const keyBtn = document.createElement("button");
    keyBtn.textContent = key;
    keyBtn.classList.add("key");
    keyBtn.addEventListener("click", () => handleKeyPress(key));
    keyboardNumbersElement.appendChild(keyBtn);
  });
  
  operatorKeys.forEach(key => {
    const keyBtn = document.createElement("button");
    keyBtn.textContent = key;
    keyBtn.classList.add("key");
    keyBtn.addEventListener("click", () => handleKeyPress(key));
    keyboardOperatorsElement.appendChild(keyBtn);
  });
  
  specialKeys.forEach(key => {
    const keyBtn = document.createElement("button");
    keyBtn.textContent = (key === "enter") ? "Enter" : "Delete";
    keyBtn.classList.add("key");
    keyBtn.addEventListener("click", () => handleKeyPress(key));
    keyboardSpecialElement.appendChild(keyBtn);
  });
}

/**************** Manejo del Teclado Físico y Virtual ****************/
document.addEventListener("keydown", (event) => {
  if (gameOver) return;
  let key = event.key.toLowerCase();
  if (allowedChars.includes(key)) {
    handleKeyPress(key);
  } else if (key === "enter") {
    handleKeyPress("enter");
  } else if (key === "backspace" || key === "delete") {
    handleKeyPress("delete");
  }
});

function handleKeyPress(key) {
  if (gameOver) return;
  if (key === "enter") {
    if (currentCol === EQUATION_LENGTH) {
      checkEquation();
    } else {
      showMessage("Faltan caracteres.");
    }
    return;
  }
  if (key === "delete") {
    if (currentCol > 0) {
      currentCol--;
      updateBoardCell(currentRow, currentCol, "");
      console.log(`Se borró carácter. (Fila ${currentRow}, Columna ${currentCol})`);
    }
    return;
  }
  if (allowedChars.includes(key) && currentCol < EQUATION_LENGTH) {
    updateBoardCell(currentRow, currentCol, key);
    currentCol++;
    console.log(`Carácter agregado: ${key.toUpperCase()} (Fila ${currentRow}, Columna ${currentCol - 1})`);
  }
}

function updateBoardCell(row, col, char) {
  const cell = document.getElementById(`cell-${row}-${col}`);
  if (cell) {
    cell.textContent = char.toUpperCase();
  }
}

function showMessage(msg) {
  messageElement.textContent = msg;
  setTimeout(() => { messageElement.textContent = ""; }, 2000);
}

/**************** Validación y Feedback ****************/
function isValidEquation(eq) {
  if (!eq.includes("=")) return false;
  const parts = eq.split("=");
  if (parts.length !== 2) return false;
  try {
    const left = eval(parts[0]);
    const right = eval(parts[1]);
    return left === right;
  } catch (e) {
    return false;
  }
}

function getFeedback(guess, target) {
  let feedback = new Array(EQUATION_LENGTH).fill("absent");
  let targetArr = target.split("");
  let guessArr = guess.split("");
  // Primera pasada: marcar coincidencias exactas
  for (let i = 0; i < EQUATION_LENGTH; i++) {
    if (guessArr[i] === targetArr[i]) {
      feedback[i] = "correct";
      targetArr[i] = null;
    }
  }
  // Segunda pasada: marcar caracteres presentes en posición distinta
  for (let i = 0; i < EQUATION_LENGTH; i++) {
    if (feedback[i] === "correct") continue;
    let index = targetArr.indexOf(guessArr[i]);
    if (index !== -1) {
      feedback[i] = "present";
      targetArr[index] = null;
    }
  }
  console.log("Feedback para el intento:", feedback);
  return feedback;
}

function paintRow(feedback) {
  for (let i = 0; i < EQUATION_LENGTH; i++) {
    const cell = document.getElementById(`cell-${currentRow}-${i}`);
    if (cell) {
      cell.classList.add(feedback[i]);
    }
  }
}

function updateKeyboardColors(guess, feedback) {
  for (let i = 0; i < EQUATION_LENGTH; i++) {
    const keyChar = guess[i];
    document.querySelectorAll(".key").forEach(btn => {
      if (btn.textContent.toLowerCase() === keyChar) {
        if (btn.classList.contains("correct")) return;
        if (feedback[i] === "correct") {
          btn.classList.remove("present", "absent");
          btn.classList.add("correct");
        } else if (feedback[i] === "present") {
          if (!btn.classList.contains("correct")) {
            btn.classList.remove("absent");
            btn.classList.add("present");
          }
        } else {
          if (!btn.classList.contains("correct") && !btn.classList.contains("present")) {
            btn.classList.add("absent");
          }
        }
      }
    });
  }
}

/**************** Proceso de Comprobación ****************/
function checkEquation() {
  let guess = "";
  for (let i = 0; i < EQUATION_LENGTH; i++) {
    const cell = document.getElementById(`cell-${currentRow}-${i}`);
    guess += cell.textContent.toLowerCase();
  }
  console.log(`Intento ${currentRow + 1}: ${guess}`);
  if (guess.length !== EQUATION_LENGTH) {
    showMessage("La ecuación debe tener 8 caracteres.");
    console.log("Error: longitud incorrecta.");
    return;
  }
  if (!guess.includes("=")) {
    showMessage("La ecuación debe contener '='.");
    console.log("Error: falta '='.");
    return;
  }
  if (!isValidEquation(guess)) {
    showMessage("Ecuación no válida.");
    console.log("Error: la ecuación no es matemáticamente válida.");
    return;
  }
  const feedback = getFeedback(guess, targetEquation);
  paintRow(feedback);
  updateKeyboardColors(guess, feedback);
  console.log(`Resultado intento ${currentRow + 1}: ${guess.toUpperCase()} | Target: ${targetEquation.toUpperCase()}`);
  if (guess === targetEquation) {
    showMessage("¡Correcto! Has ganado.");
    console.log("¡Ganaste! Resultado final:", targetEquation.toUpperCase());
    gameOver = true;
    disableKeyboard();
    if (isDailyMode) saveDailyGameState();
    return;
  }
  currentRow++;
  currentCol = 0;
  if (currentRow === MAX_ATTEMPTS) {
    showMessage(`Fin del juego. La ecuación era: ${targetEquation.toUpperCase()}`);
    console.log("Fin del juego. Resultado final:", targetEquation.toUpperCase());
    gameOver = true;
    disableKeyboard();
    currentRow = MAX_ATTEMPTS - 1; // Asegura que se muestre la última fila
  }
  if (isDailyMode) saveDailyGameState();
}

function disableKeyboard() {
  document.querySelectorAll(".key").forEach(key => key.disabled = true);
}

/**************** Funciones de Reinicio y Modo Diario ****************/
function restartGame() {
  if (isDailyMode) {
    showMessage("El juego diario no se puede reiniciar.");
    return;
  }
  currentRow = 0;
  currentCol = 0;
  gameOver = false;
  generateBoard();
  generateKeyboard();
  targetEquation = getNormalEquation();
  console.log("Nuevo target (modo normal):", targetEquation);
}

function loadDailyGameState() {
  const savedState = localStorage.getItem(DAILY_GAME_STATE_KEY);
  if (savedState) {
    const state = JSON.parse(savedState);
    if (state.lastPlayedDate === new Date().toDateString()) {
      currentRow = state.currentRow;
      currentCol = state.currentCol;
      gameOver = state.gameOver;
      targetEquation = state.targetEquation;
      state.board.forEach(item => {
        const cell = document.getElementById(`cell-${item.row}-${item.col}`);
        if (cell) {
          cell.textContent = item.letter.toUpperCase();
          if (item.color) cell.classList.add(item.color);
        }
      });
      state.keyboard.forEach(item => {
        document.querySelectorAll(".key").forEach(btn => {
          if (btn.textContent.toLowerCase() === item.letter && item.color && item.color.trim() !== "") {
            btn.classList.add(item.color);
          }
        });
      });
      console.log("Estado diario cargado:", state);
      if (gameOver) {
        disableKeyboard();
      }
      return true;
    }
  }
  return false;
}

function saveDailyGameState() {
  const boardState = [];
  for (let row = 0; row < MAX_ATTEMPTS; row++) {
    for (let col = 0; col < EQUATION_LENGTH; col++) {
      const cell = document.getElementById(`cell-${row}-${col}`);
      boardState.push({
        row: row,
        col: col,
        letter: cell.textContent.toLowerCase(),
        color: cell.classList.contains("correct")
          ? "correct"
          : cell.classList.contains("present")
          ? "present"
          : cell.classList.contains("absent")
          ? "absent"
          : ""
      });
    }
  }
  const keyboardState = [];
  document.querySelectorAll(".key").forEach(btn => {
    keyboardState.push({
      letter: btn.textContent.toLowerCase(),
      color: btn.classList.contains("correct")
        ? "correct"
        : btn.classList.contains("present")
        ? "present"
        : btn.classList.contains("absent")
        ? "absent"
        : ""
    });
  });
  const state = {
    currentRow,
    currentCol,
    gameOver,
    targetEquation,
    board: boardState,
    keyboard: keyboardState,
    lastPlayedDate: new Date().toDateString()
  };
  localStorage.setItem(DAILY_GAME_STATE_KEY, JSON.stringify(state));
  console.log("Estado diario guardado:", state);
}

/**************** Eventos de Botones ****************/
toggleModeButton.addEventListener("click", () => {
  isDailyMode = !isDailyMode;
  if (isDailyMode) {
    toggleModeButton.textContent = "Modo Diario";
    restartButton.disabled = true;
    if (!loadDailyGameState()) {
      // En modo diario, usamos la ecuación determinada por el hash de la fecha
      targetEquation = getDailyEquation();
      console.log("Modo Diario. Target:", targetEquation);
      saveDailyGameState();
    }
  } else {
    toggleModeButton.textContent = "Modo Normal";
    restartButton.disabled = false;
    restartGame();
  }
});

restartButton.addEventListener("click", () => {
  restartGame();
});

/**************** Inicialización ****************/
document.addEventListener("DOMContentLoaded", () => {
  generateBoard();
  generateKeyboard();
  // Determinamos el modo; por defecto, se arranca en modo normal
  if (!isDailyMode) {
    targetEquation = getNormalEquation();
    console.log("Modo Normal. Target:", targetEquation);
  } else {
    if (!loadDailyGameState()) {
      targetEquation = getDailyEquation();
      console.log("Modo Diario. Target:", targetEquation);
      saveDailyGameState();
    }
  }
});
