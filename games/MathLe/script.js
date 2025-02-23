/**************** Función para Generar una Ecuación Aleatoria ****************/
function generateEquation() {
  const ops = ['+', '-'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let A, B, C;
  if (op === '+') {
    // Para suma: A entre 10 y 89; B entre 10 y (99 - A)
    A = Math.floor(Math.random() * (89 - 10 + 1)) + 10; // [10, 89]
    const maxB = 99 - A;
    if (maxB < 10) return generateEquation(); // Reintentar si no hay rango válido
    B = Math.floor(Math.random() * (maxB - 10 + 1)) + 10; // [10, maxB]
    C = A + B;
    if (C < 10 || C > 99) return generateEquation(); // Asegurar que C tenga 2 dígitos
  } else { // Para resta: A entre 20 y 99; B entre 10 y (A - 10)
    A = Math.floor(Math.random() * (99 - 20 + 1)) + 20; // [20, 99]
    const maxB = A - 10;
    if (maxB < 10) return generateEquation();
    B = Math.floor(Math.random() * (maxB - 10 + 1)) + 10; // [10, maxB]
    C = A - B;
    if (C < 10 || C > 99) return generateEquation();
  }
  // Se retorna la ecuación en formato: NN?NN=NN (8 caracteres exactos)
  return A.toString() + op + B.toString() + "=" + C.toString();
}

/**************** Variables Globales y Constantes ****************/
const MAX_ATTEMPTS = 6;
const EQUATION_LENGTH = 8;
let currentRow = 0;
let currentCol = 0;
let gameOver = false;
let targetEquation = "";
let isDailyMode = false;  // false = modo normal, true = modo diario

// Constante para el estado diario en localStorage
const DAILY_GAME_STATE_KEY = "dailyGameStateNerdle";

// Teclado virtual: si solo usamos "+" y "-" (más "=") se restringe allowedChars
const numberKeys = ["1","2","3","4","5","6","7","8","9","0"];
const operatorKeys = ["+", "-", "="];  // En este ejemplo solo se usan suma y resta
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
  // Limpiar filas
  keyboardNumbersElement.innerHTML = "";
  keyboardOperatorsElement.innerHTML = "";
  keyboardSpecialElement.innerHTML = "";

  // Fila 1: Números
  numberKeys.forEach(key => {
    const keyBtn = document.createElement("button");
    keyBtn.textContent = key;
    keyBtn.classList.add("key");
    keyBtn.addEventListener("click", () => handleKeyPress(key));
    keyboardNumbersElement.appendChild(keyBtn);
  });

  // Fila 2: Operadores
  operatorKeys.forEach(key => {
    const keyBtn = document.createElement("button");
    keyBtn.textContent = key;
    keyBtn.classList.add("key");
    keyBtn.addEventListener("click", () => handleKeyPress(key));
    keyboardOperatorsElement.appendChild(keyBtn);
  });

  // Fila 3: Teclas especiales
  specialKeys.forEach(key => {
    const keyBtn = document.createElement("button");
    keyBtn.textContent = (key === "enter") ? "Enter" : "Delete";
    keyBtn.classList.add("key");
    keyBtn.addEventListener("click", () => handleKeyPress(key));
    keyboardSpecialElement.appendChild(keyBtn);
  });
}

/**************** Manejo del Teclado Físico y Virtual ****************/
// Teclado físico
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

// Función para procesar la pulsación de tecla (virtual o física)
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

// Actualiza el contenido de una celda en el grid
function updateBoardCell(row, col, char) {
  const cell = document.getElementById(`cell-${row}-${col}`);
  if (cell) {
    cell.textContent = char.toUpperCase();
  }
}

// Muestra mensajes en pantalla (por 2 segundos)
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
  // Primera pasada: posición correcta
  for (let i = 0; i < EQUATION_LENGTH; i++) {
    if (guessArr[i] === targetArr[i]) {
      feedback[i] = "correct";
      targetArr[i] = null;
    }
  }
  // Segunda pasada: carácter presente en otra posición
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
    // No incrementamos currentRow si se ganó
    if (isDailyMode) saveDailyGameState();
    return;
  }
  currentRow++;
  currentCol = 0;
  // Si se acabaron los intentos, ajustamos currentRow para que no exceda el índice de la grilla
  if (currentRow === MAX_ATTEMPTS) {
    showMessage(`Fin del juego. La ecuación era: ${targetEquation.toUpperCase()}`);
    console.log("Fin del juego. Resultado final:", targetEquation.toUpperCase());
    gameOver = true;
    disableKeyboard();
    currentRow = MAX_ATTEMPTS - 1; // Ajuste para que la última fila se muestre correctamente
  }
  if (isDailyMode) saveDailyGameState();
}

/**************** Función para Deshabilitar el Teclado ****************/
function disableKeyboard() {
  document.querySelectorAll(".key").forEach(key => key.disabled = true);
}

/**************** Funciones de Reinicio y Modo Diario ****************/
// Reinicia el juego (modo normal)
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
  targetEquation = generateEquation();
  console.log("Nuevo target (modo normal):", targetEquation);
}

// Carga o crea el estado diario desde localStorage
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
      // Si el juego terminó, deshabilitamos el teclado
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

/**************** Función Hash (opcional) ****************/
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

/**************** Eventos de Botones ****************/
toggleModeButton.addEventListener("click", () => {
  isDailyMode = !isDailyMode;
  if (isDailyMode) {
    toggleModeButton.textContent = "Modo Diario";
    restartButton.disabled = true;
    if (!loadDailyGameState()) {
      // Generamos la ecuación diaria y la guardamos
      targetEquation = generateEquation();
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
  if (!isDailyMode) {
    targetEquation = generateEquation();
    console.log("Modo Normal. Target:", targetEquation);
  } else {
    if (!loadDailyGameState()) {
      targetEquation = generateEquation();
      console.log("Modo Diario. Target:", targetEquation);
      saveDailyGameState();
    }
  }
});
