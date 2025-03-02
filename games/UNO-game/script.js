/* Variables globales */
let deck = [];
let discardPile = [];
let playerHand = [];
let computerHand = [];
let currentPlayer = "player"; // "player" o "computer"
let currentColor = "";
let pendingDraw = 0; // cartas pendientes por efectos +2 o +4
let skipNext = false; // para saltar turno

// Construye el mazo de cartas UNO
function buildDeck() {
  let newDeck = [];
  const colores = ["rojo", "verde", "azul", "amarillo"];
  // Cartas numéricas
  colores.forEach(color => {
    // Una carta 0
    newDeck.push({color: color, tipo: "numero", numero: 0});
    // Dos de cada carta del 1 al 9
    for (let i = 1; i <= 9; i++) {
      newDeck.push({color: color, tipo: "numero", numero: i});
      newDeck.push({color: color, tipo: "numero", numero: i});
    }
    // Cartas especiales: salta, reversa y +2 (dos de cada)
    ["skip", "reverse", "draw2"].forEach(tipo => {
      newDeck.push({color: color, tipo: tipo});
      newDeck.push({color: color, tipo: tipo});
    });
  });
  // Cartas comodín: comodín y +4 (cuatro de cada)
  for (let i = 0; i < 4; i++) {
    newDeck.push({color: "comodin", tipo: "wild"});
    newDeck.push({color: "comodin", tipo: "wildDraw4"});
  }
  return newDeck;
}

// Algoritmo de Fisher-Yates para barajar
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Inicializa la partida
function initializeGame() {
  deck = buildDeck();
  shuffle(deck);
  discardPile = [];
  playerHand = [];
  computerHand = [];
  pendingDraw = 0;
  skipNext = false;
  // Reparte 7 cartas a cada uno
  for (let i = 0; i < 7; i++) {
    playerHand.push(deck.shift());
    computerHand.push(deck.shift());
  }
  // Define la primera carta de la pila de descarte (no debe ser comodín o +4)
  let firstCard;
  do {
    firstCard = deck.shift();
    if (firstCard.tipo === "wild" || firstCard.tipo === "wildDraw4") {
      deck.push(firstCard); // si es comodín, lo regresa al mazo
    } else {
      discardPile.push(firstCard);
      currentColor = firstCard.color;
      break;
    }
  } while (true);
  currentPlayer = "player";
  renderHands();
  renderDiscardPile();
  updateTurnInfo("¡Tu turno!");
}

// Actualiza la visualización de las manos
function renderHands() {
  // Mano del jugador
  const playerDiv = document.getElementById("player-hand");
  playerDiv.innerHTML = "";
  playerHand.forEach((card, index) => {
    let cardDiv = document.createElement("div");
    cardDiv.className = "card " + (card.color === "comodin" ? "comodin" : card.color);
    cardDiv.dataset.index = index;
    cardDiv.onclick = function() {
      if (currentPlayer === "player") {
        playerPlayCard(index);
      }
    };
    if (card.tipo === "numero") {
      cardDiv.innerText = card.numero;
    } else if (card.tipo === "skip") {
      cardDiv.innerText = "⏭";
    } else if (card.tipo === "reverse") {
      cardDiv.innerText = "🔄";
    } else if (card.tipo === "draw2") {
      cardDiv.innerText = "+2";
    } else if (card.tipo === "wild") {
      cardDiv.innerText = "✳";
    } else if (card.tipo === "wildDraw4") {
      cardDiv.innerText = "+4";
    }
    playerDiv.appendChild(cardDiv);
  });
  
  // Mano de la PC: se muestran solo el reverso de las cartas
  const compDiv = document.getElementById("computer-hand");
  compDiv.innerHTML = "";
  computerHand.forEach(() => {
    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.style.backgroundColor = "#333";
    cardDiv.style.border = "1px solid #333";
    cardDiv.innerText = "";
    compDiv.appendChild(cardDiv);
  });
}

// Muestra la carta superior de la pila de descarte
function renderDiscardPile() {
  const discardDiv = document.getElementById("discard-pile");
  discardDiv.innerHTML = "";
  let topCard = discardPile[discardPile.length - 1];
  let cardDiv = document.createElement("div");
  cardDiv.className = "card " + (topCard.color === "comodin" ? "comodin" : topCard.color);
  if (topCard.tipo === "numero") {
    cardDiv.innerText = topCard.numero;
  } else if (topCard.tipo === "skip") {
    cardDiv.innerText = "⏭";
  } else if (topCard.tipo === "reverse") {
    cardDiv.innerText = "🔄";
  } else if (topCard.tipo === "draw2") {
    cardDiv.innerText = "+2";
  } else if (topCard.tipo === "wild") {
    cardDiv.innerText = "✳";
  } else if (topCard.tipo === "wildDraw4") {
    cardDiv.innerText = "+4";
  }
  discardDiv.appendChild(cardDiv);
}

// Actualiza el mensaje de turno
function updateTurnInfo(text) {
  const turnInfo = document.getElementById("turn-info");
  turnInfo.innerText = text;
}

// Muestra mensajes temporales
function showMessage(text) {
  const msgDiv = document.getElementById("message");
  msgDiv.innerText = text;
  setTimeout(() => { msgDiv.innerText = ""; }, 3000);
}

// Verifica si una carta es válida para jugar
function isValidMove(card) {
  let topCard = discardPile[discardPile.length - 1];
  // Los comodines siempre se pueden jugar
  if (card.tipo === "wild" || card.tipo === "wildDraw4") return true;
  // Coincidencia de color
  if (card.color === currentColor) return true;
  // Coincidencia de número si ambas son cartas numéricas
  if (card.tipo === "numero" && topCard.tipo === "numero" && card.numero === topCard.numero) return true;
  // Coincidencia de carta especial (no numérica)
  if (card.tipo === topCard.tipo && card.tipo !== "numero") return true;
  return false;
}

// Función que se ejecuta al hacer clic en una carta del jugador
function playerPlayCard(index) {
  let card = playerHand[index];
  if (!isValidMove(card)) {
    showMessage("Movimiento inválido. Selecciona otra carta o roba.");
    return;
  }
  // Elimina la carta de la mano del jugador y la coloca en la pila de descarte
  playerHand.splice(index, 1);
  discardPile.push(card);
  
  // Procesa los efectos especiales de la carta
  processCardEffect(card, "player");
  
  renderHands();
  renderDiscardPile();
  
  // Verifica si el jugador ganó
  if (playerHand.length === 0) {
    alert("¡Felicidades, ganaste!");
    initializeGame();
    return;
  }
  
  // Si hay cartas pendientes por efectos (+2 o +4), la PC roba y pierde turno
  if (pendingDraw > 0) {
    setTimeout(() => {
      computerDrawCards(pendingDraw);
      pendingDraw = 0;
      currentPlayer = "computer";
      updateTurnInfo("Turno de la PC (tras robar cartas)");
      setTimeout(computerTurn, 1000);
    }, 500);
  } else if (skipNext) {
    // Si se saltó el turno de la PC, se vuelve al jugador
    skipNext = false;
    currentPlayer = "player";
    updateTurnInfo("Tu turno (la PC fue saltada)");
  } else {
    currentPlayer = "computer";
    updateTurnInfo("Turno de la PC");
    setTimeout(computerTurn, 1000);
  }
}

// Aplica el efecto de la carta jugada
function processCardEffect(card, jugador) {
  // Si la carta no es un comodín, el color actual pasa a ser el de la carta
  if (card.tipo !== "wild" && card.tipo !== "wildDraw4") {
    currentColor = card.color;
  }
  
  if (card.tipo === "skip" || card.tipo === "reverse") {
    // En dos jugadores, reversa actúa como salta turno
    skipNext = true;
  }
  
  if (card.tipo === "draw2") {
    pendingDraw += 2;
    skipNext = true;
  }
  
  if (card.tipo === "wild") {
    if (jugador === "player") {
      let chosenColor = prompt("Elige un color: rojo, verde, azul o amarillo").toLowerCase();
      if (["rojo", "verde", "azul", "amarillo"].includes(chosenColor)) {
        currentColor = chosenColor;
      } else {
        currentColor = "rojo"; // color por defecto
      }
    } else {
      const colores = ["rojo", "verde", "azul", "amarillo"];
      currentColor = colores[Math.floor(Math.random() * colores.length)];
    }
  }
  
  if (card.tipo === "wildDraw4") {
    pendingDraw += 4;
    skipNext = true;
    if (jugador === "player") {
      let chosenColor = prompt("Elige un color: rojo, verde, azul o amarillo").toLowerCase();
      if (["rojo", "verde", "azul", "amarillo"].includes(chosenColor)) {
        currentColor = chosenColor;
      } else {
        currentColor = "rojo";
      }
    } else {
      const colores = ["rojo", "verde", "azul", "amarillo"];
      currentColor = colores[Math.floor(Math.random() * colores.length)];
    }
  }
}

// Lógica del turno de la PC
function computerTurn() {
  if (pendingDraw > 0) {
    currentPlayer = "player";
    updateTurnInfo("Tu turno");
    return;
  }
  
  let played = false;
  // La PC recorre su mano y juega la primera carta válida
  for (let i = 0; i < computerHand.length; i++) {
    let card = computerHand[i];
    if (isValidMove(card)) {
      computerHand.splice(i, 1);
      discardPile.push(card);
      showMessage("La PC jugó una carta.");
      processCardEffect(card, "computer");
      played = true;
      break;
    }
  }
  
  if (!played) {
    // Si no tiene carta válida, roba una
    let drawnCard = deck.shift();
    if (!drawnCard) {
      // Si el mazo se acabó, se rebaraja la pila de descarte (excepto la última carta)
      let top = discardPile.pop();
      deck = discardPile;
      shuffle(deck);
      discardPile = [top];
      drawnCard = deck.shift();
    }
    computerHand.push(drawnCard);
    showMessage("La PC roba una carta.");
    // Si la carta robada es jugable, la juega de inmediato
    if (isValidMove(drawnCard)) {
      setTimeout(() => {
        let index = computerHand.indexOf(drawnCard);
        computerHand.splice(index, 1);
        discardPile.push(drawnCard);
        showMessage("La PC juega la carta robada.");
        processCardEffect(drawnCard, "computer");
        renderHands();
        renderDiscardPile();
        if (computerHand.length === 0) {
          alert("La PC ha ganado. ¡Inténtalo de nuevo!");
          initializeGame();
          return;
        }
        currentPlayer = "player";
        updateTurnInfo("Tu turno");
      }, 1000);
      renderHands();
      renderDiscardPile();
      return;
    }
  }
  
  renderHands();
  renderDiscardPile();
  
  if (computerHand.length === 0) {
    alert("La PC ha ganado. ¡Inténtalo de nuevo!");
    initializeGame();
    return;
  }
  
  currentPlayer = "player";
  updateTurnInfo("Tu turno");
}

// Función para que la PC robe cartas (por efecto +2 o +4)
function computerDrawCards(n) {
  for (let i = 0; i < n; i++) {
    let card = deck.shift();
    if (!card) {
      let top = discardPile.pop();
      deck = discardPile;
      shuffle(deck);
      discardPile = [top];
      card = deck.shift();
    }
    computerHand.push(card);
  }
  renderHands();
}

// Función para que el jugador robe una carta (al hacer clic en el mazo)
function playerDrawCard() {
  if (currentPlayer !== "player") return;
  let drawnCard = deck.shift();
  if (!drawnCard) {
    let top = discardPile.pop();
    deck = discardPile;
    shuffle(deck);
    discardPile = [top];
    drawnCard = deck.shift();
  }
  playerHand.push(drawnCard);
  renderHands();
  showMessage("Has robado una carta.");
  
  // Permite jugar la carta robada de inmediato si es válida
  if (isValidMove(drawnCard)) {
    if (confirm("¿Quieres jugar la carta que acabas de robar?")) {
      let index = playerHand.length - 1;
      playerPlayCard(index);
      return;
    }
  }
  
  currentPlayer = "computer";
  updateTurnInfo("Turno de la PC");
  setTimeout(computerTurn, 1000);
}

window.onload = initializeGame;
