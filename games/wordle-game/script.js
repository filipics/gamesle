/************************************************************
 * script.js - Wordle sin Servidor con funcionalidad completa
 * y teclado organizado en tres filas (integrando ambas versiones)
 * 
 * Mejoras:
 * - El juego arranca en modo normal (isDailyMode = false).
 * - Se agrega un botón "Volver al menú principal" (acción a definir).
 ************************************************************/

/* ==================== Variables Globales ==================== */
let currentRow = 0;
let currentCol = 0;
let gameOver = false;
const maxAttempts = 6;
const allowedLetters = "qwertyuiopasdfghjklñzxcvbnm";
let targetWord = "";
let isDailyMode = false;
let guessedWords = [];

/* ==================== Listas de Palabras y Utilidades ==================== */
function removeAccents(word) {
  return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const wordSelectionList = ["frase", "agita", "albor", "perro", "gatos", "nubes"];
const wordValidationList = ["zuñís", "zuños", "zuñós", "zuras", "zuros", "zuzos"].map(word => removeAccents(word));

/* ==================== Estado del Juego Diario (LocalStorage) ==================== */
function loadDailyGameState() {
  const savedGame = JSON.parse(localStorage.getItem("dailyGameState"));
  if (savedGame && savedGame.lastPlayedDate === new Date().toDateString()) {
    guessedWords = savedGame.guessedWords || [];
    currentRow = savedGame.currentRow || 0;
    const cells = document.querySelectorAll(".cell");
    savedGame.boardState.forEach((cellData, index) => {
      const cell = cells[index];
      cell.querySelector("span").innerText = cellData.letter;
      cell.classList.remove("correct", "present", "absent");
      if (cellData.class) {
        cell.classList.add(cellData.class);
      }
    });
    savedGame.keyboardState.forEach(keyData => {
      const keyElement = document.getElementById("key-" + keyData.letter);
      if (keyElement) {
        keyElement.classList.remove("correct", "present", "absent");
        if (keyData.class) {
          keyElement.classList.add(keyData.class);
        }
      }
    });
    if (savedGame.gameOver === true) {
      gameOver = true;
      document.querySelectorAll(".key").forEach(key => key.style.pointerEvents = "none");
    }
    return true;
  }
  return false;
}

function saveDailyGameState() {
  if (isDailyMode) {
    const cells = document.querySelectorAll(".cell");
    const boardState = Array.from(cells).map(cell => ({
      letter: cell.querySelector("span").innerText,
      class: cell.classList.contains("correct")
        ? "correct"
        : cell.classList.contains("present")
        ? "present"
        : cell.classList.contains("absent")
        ? "absent"
        : ""
    }));
    const keys = document.querySelectorAll(".key");
    const keyboardState = Array.from(keys).map(key => ({
      letter: key.innerText.toLowerCase(),
      class: key.classList.contains("correct")
        ? "correct"
        : key.classList.contains("present")
        ? "present"
        : key.classList.contains("absent")
        ? "absent"
        : ""
    }));
    const gameState = {
      guessedWords: guessedWords,
      currentRow: currentRow,
      boardState: boardState,
      keyboardState: keyboardState,
      gameOver: gameOver,
      lastPlayedDate: new Date().toDateString()
    };
    localStorage.setItem("dailyGameState", JSON.stringify(gameState));
  }
}

function saveGameResult(won, attempts) {
  let gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
  let gameRecord = {
    date: new Date().toLocaleDateString(),
    word: targetWord,
    attempts: won ? attempts : maxAttempts,
    result: won ? "Ganó" : "Perdió"
  };
  gameHistory.push(gameRecord);
  localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
  updateHistoryDisplay();
}

function updateHistoryDisplay() {
  const historyContainer = document.getElementById("history");
  let gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
  historyContainer.innerHTML = "<h3>Historial de Partidas</h3>";
  if (gameHistory.length === 0) {
    historyContainer.innerHTML += "<p>Aún no hay partidas registradas.</p>";
    return;
  }
  gameHistory.slice(-10).forEach(game => {
    const entry = document.createElement("p");
    entry.textContent = `${game.date}: ${game.word} - ${game.result} en ${game.attempts} intentos`;
    historyContainer.appendChild(entry);
  });
}

function toggleHistory() {
  const historyContainer = document.getElementById("history");
  if (historyContainer.style.display === "none" || historyContainer.style.display === "") {
    historyContainer.style.display = "block";
    updateHistoryDisplay();
  } else {
    historyContainer.style.display = "none";
  }
}

/* ==================== Selección de Palabra ==================== */
function selectRandomWord() {
  const wordsOfFiveLetters = wordSelectionList.filter(word => word.length === 5);
  if (wordsOfFiveLetters.length > 0) {
    if (isDailyMode) {
      const savedDailyWord = localStorage.getItem("dailyWord");
      const todayDate = new Date().toDateString();
      if (savedDailyWord && localStorage.getItem("lastPlayedDate") === todayDate) {
        targetWord = savedDailyWord;
      } else {
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        const randomIndex = seed % wordsOfFiveLetters.length;
        targetWord = wordsOfFiveLetters[randomIndex];
        localStorage.setItem("dailyWord", targetWord);
        localStorage.setItem("lastPlayedDate", todayDate);
      }
    } else {
      const randomIndex = Math.floor(Math.random() * wordsOfFiveLetters.length);
      targetWord = wordsOfFiveLetters[randomIndex];
    }
  } else {
    console.error("No hay palabras de 5 letras.");
    targetWord = "perro";
  }
}

/* ==================== Generar el Tablero (Grid) ==================== */
function generateGrid() {
  currentRow = 0;
  currentCol = 0;
  gameOver = false;
  document.getElementById("message").innerText = "";
  document.getElementById("reveal-word").innerText = "";
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  for (let i = 0; i < maxAttempts * 5; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    const span = document.createElement("span");
    cell.appendChild(span);
    grid.appendChild(cell);
  }
}

/* ==================== Generar el Teclado ==================== */
function generateKeyboard() {
  const row1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const row2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"];
  const row3 = ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"];
  document.querySelector(".row-1").innerHTML = "";
  document.querySelector(".row-2").innerHTML = "";
  document.querySelector(".row-3").innerHTML = "";
  row1.forEach(letter => createKey(letter, document.querySelector(".row-1")));
  row2.forEach(letter => createKey(letter, document.querySelector(".row-2")));
  row3.forEach(letter => createKey(letter, document.querySelector(".row-3")));
}

function createKey(letter, rowContainer) {
  const keyDiv = document.createElement("div");
  keyDiv.classList.add("key");
  if (letter === "backspace") {
    keyDiv.classList.add("backspace");
    keyDiv.textContent = "⌫";
  } else if (letter === "enter") {
    keyDiv.textContent = "Enter";
  } else {
    keyDiv.textContent = letter;
  }
  keyDiv.id = "key-" + letter;
  keyDiv.addEventListener("click", () => handleKeyPress(letter));
  rowContainer.appendChild(keyDiv);
}

/* ==================== Manejo de Entrada de Teclas ==================== */
function handleKeyPress(key) {
  if (gameOver) return;
  key = key.toLowerCase();
  if (key === "enter") {
    if (currentCol === 5) {
      checkWord();
    } else {
      showMessage("Faltan letras.");
    }
    return;
  }
  if (key === "backspace" || key === "delete") {
    if (currentCol > 0) {
      currentCol--;
      const cells = document.querySelectorAll(".cell span");
      cells[currentRow * 5 + currentCol].textContent = "";
    }
    return;
  }
  if (!allowedLetters.includes(key)) return;
  if (currentCol < 5) {
    const cells = document.querySelectorAll(".cell span");
    cells[currentRow * 5 + currentCol].textContent = key.toUpperCase();
    currentCol++;
  }
}

/* ==================== Validar y Procesar la Palabra ==================== */
function checkWord() {
  const cells = document.querySelectorAll(".cell span");
  let word = "";
  for (let i = 0; i < 5; i++) {
    word += cells[currentRow * 5 + i].textContent.toLowerCase();
  }
  if (!wordValidationList.includes(word)) {
    showMessage("❌ No está en la lista.");
    return;
  }
  processWord(word);
}

function processWord(inputWord) {
  const cells = document.querySelectorAll(".cell span");
  const letterCount = {};
  for (let char of targetWord) {
    letterCount[char] = (letterCount[char] || 0) + 1;
  }
  for (let i = 0; i < 5; i++) {
    const letter = inputWord[i];
    if (letter === targetWord[i]) {
      cells[currentRow * 5 + i].parentElement.classList.add("correct");
      updateKeyColor(document.getElementById("key-" + letter), "correct");
      letterCount[letter]--;
    }
  }
  for (let i = 0; i < 5; i++) {
    const letter = inputWord[i];
    const cellDiv = cells[currentRow * 5 + i].parentElement;
    if (!cellDiv.classList.contains("correct")) {
      if (targetWord.includes(letter) && letterCount[letter] > 0) {
        cellDiv.classList.add("present");
        updateKeyColor(document.getElementById("key-" + letter), "present");
        letterCount[letter]--;
      } else {
        cellDiv.classList.add("absent");
        updateKeyColor(document.getElementById("key-" + letter), "absent");
      }
    }
  }
  if (inputWord === targetWord) {
    showMessage("¡Ganaste!");
    revealWord("La palabra era: " + targetWord.toUpperCase());
    gameOver = true;
    saveGameResult(true, currentRow + 1);
    if (isDailyMode) {
      saveDailyGameState();
      document.querySelectorAll(".key").forEach(key => key.style.pointerEvents = "none");
    }
    return;
  }
  if (currentRow === maxAttempts - 1) {
    showMessage("¡Se acabaron los intentos!");
    revealWord("La palabra era: " + targetWord.toUpperCase());
    gameOver = true;
    saveGameResult(false, currentRow + 1);
    if (isDailyMode) {
      saveDailyGameState();
      document.querySelectorAll(".key").forEach(key => key.style.pointerEvents = "none");
    }
    return;
  }
  currentRow++;
  currentCol = 0;
  saveDailyGameState();
}

/* ==================== Actualizar Color de Teclas ==================== */
function updateKeyColor(keyEl, newStatus) {
  if (!keyEl) return;
  const priority = { unused: 0, absent: 1, present: 2, correct: 3 };
  let currStatus = "unused";
  if (keyEl.classList.contains("correct")) currStatus = "correct";
  else if (keyEl.classList.contains("present")) currStatus = "present";
  else if (keyEl.classList.contains("absent")) currStatus = "absent";
  if (priority[newStatus] > priority[currStatus]) {
    keyEl.classList.remove("correct", "present", "absent", "unused");
    keyEl.classList.add(newStatus);
  }
}

/* ==================== Funciones Auxiliares ==================== */
function showMessage(msg) {
  const msgEl = document.getElementById("message");
  msgEl.innerText = msg;
  setTimeout(() => {
    msgEl.innerText = "";
  }, 2000);
}

function revealWord(text) {
  document.getElementById("reveal-word").innerText = text;
}

/* ==================== Reiniciar ==================== */
function resetGame() {
  if (isDailyMode) {
    showMessage("El juego diario no se puede reiniciar.");
    return;
  }
  selectRandomWord();
  generateGrid();
  generateKeyboard();
  document.querySelectorAll(".key").forEach(k => {
    k.classList.remove("correct", "present", "absent");
    k.style.pointerEvents = "auto";
  });
}

/* ==================== Cambio de Modo ==================== */
document.getElementById("modeToggle").addEventListener("click", function () {
  isDailyMode = !isDailyMode;
  this.textContent = isDailyMode ? "Modo Diario" : "Modo Normal";
  if (isDailyMode) {
    generateGrid();
    generateKeyboard();
    const savedDailyWord = localStorage.getItem("dailyWord");
    if (savedDailyWord) {
      targetWord = savedDailyWord;
    }
    if (!loadDailyGameState()) {
      selectRandomWord();
      saveDailyGameState();
    }
    document.getElementById("reset-game").disabled = true;
    return;
  } else {
    document.getElementById("reset-game").disabled = false;
    selectRandomWord();
    resetGame();
  }
});


/* ==================== Inicialización ==================== */
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("toggle-history").addEventListener("click", toggleHistory);
  document.getElementById("reset-game").addEventListener("click", resetGame);
  document.addEventListener("keydown", (event) => {
    handleKeyPress(event.key);
  });
  // Inicio en modo normal
  selectRandomWord();
  resetGame();
  generateKeyboard();
  updateHistoryDisplay();
});
