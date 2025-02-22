document.addEventListener('DOMContentLoaded', function() {
  // Lista de ecuaciones de ejemplo (puedes ampliarla o generar ecuaciones dinámicamente)
  const equations = ["4+3=7", "2*3=6", "8-5=3", "9/3=3", "1+4=5", "7-2=5", "6+2=8"];
  // Seleccionar una ecuación al azar
  const targetEquation = equations[Math.floor(Math.random() * equations.length)];
  const maxAttempts = 6;
  let attempts = 0;

  // Elementos del DOM
  const board = document.getElementById("board");
  const input = document.getElementById("guess-input");
  const message = document.getElementById("message");
  const submitBtn = document.getElementById("submit-btn");
  const newGameBtn = document.getElementById("new-game-btn");

  // Ajustar la longitud máxima del input según la ecuación objetivo
  input.maxLength = targetEquation.length;

  // Enviar con botón y con la tecla Enter
  submitBtn.addEventListener("click", handleSubmit);
  input.addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  });

  // Reiniciar juego
  newGameBtn.addEventListener("click", function() {
    window.location.reload();
  });

  function handleSubmit() {
    const guess = input.value.trim();

    // Verificar la longitud del guess
    if (guess.length !== targetEquation.length) {
      message.textContent = `La ecuación debe tener ${targetEquation.length} caracteres.`;
      return;
    }

    // Verificar el formato: exactamente un '='
    if (!isValidFormat(guess)) {
      message.textContent = `La ecuación debe contener exactamente un '='.`;
      return;
    }

    // Verificar que la ecuación sea matemáticamente válida
    if (!evaluateEquation(guess)) {
      message.textContent = `La ecuación no es matemáticamente válida.`;
      return;
    }

    attempts++;
    const feedback = getFeedback(guess, targetEquation);
    addGuessToBoard(guess, feedback);

    if (guess === targetEquation) {
      message.textContent = "¡Felicidades! ¡Has resuelto la ecuación!";
      endGame();
    } else if (attempts >= maxAttempts) {
      message.textContent = `¡Juego terminado! La ecuación correcta era ${targetEquation}.`;
      endGame();
    } else {
      message.textContent = `Intento ${attempts} de ${maxAttempts}.`;
    }

    input.value = "";
    input.focus();
  }

  // Verificar que la ecuación contenga exactamente un '='
  function isValidFormat(eq) {
    return (eq.split("=").length - 1) === 1;
  }

  // Evaluar si la parte izquierda es igual a la parte derecha
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

  // Obtener retroalimentación para cada carácter (verde, amarillo, gris)
  function getFeedback(guess, target) {
    let feedback = new Array(guess.length).fill("gray");
    let targetChars = target.split("");
    let guessChars = guess.split("");

    // Primera pasada: caracteres correctos en la posición correcta (verde)
    for (let i = 0; i < guessChars.length; i++) {
      if (guessChars[i] === targetChars[i]) {
        feedback[i] = "green";
        targetChars[i] = null; // Quitar el carácter ya usado
      }
    }

    // Segunda pasada: caracteres presentes pero en posición distinta (amarillo)
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

  // Añadir la fila del guess en el tablero con la retroalimentación de colores
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

  // Finalizar el juego deshabilitando la entrada y mostrando el botón de reinicio
  function endGame() {
    submitBtn.disabled = true;
    input.disabled = true;
    newGameBtn.style.display = "inline-block";
  }
});

