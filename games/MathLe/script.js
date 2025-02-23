/**************** Variables Globales y Constantes ****************/
const MAX_ATTEMPTS = 6;
const EQUATION_LENGTH = 8;
let currentRow = 0;
let currentCol = 0;
let gameOver = false;
let targetEquation = "";
let isDailyMode = false;  // false = modo normal, true = modo diario

// Para almacenar el estado del juego diario en localStorage
const DAILY_GAME_STATE_KEY = "dailyGameStateNerdle";
const DAILY_EQUATION_KEY = "dailyEquationNerdle";
const LAST_PLAYED_DATE_KEY = "lastPlayedDateNerdle";

// Lista de ecuaciones válidas (solo aquellas con 8 caracteres exactos)
const validEquations = [
  "10+10=20",
  "12+12=24",
  "10+11=21",
  "11+12=23"
];

// Teclado virtual: 3 filas
const numberKeys = ["1","2","3","4","5","6","7","8","9","0"];
const operatorKeys = ["+", "-", "*", "/", "="];
const specialKeys = ["enter", "delete"];
const allowedChars = "0123456789+-*/=";

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
    keyb
