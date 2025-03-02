/* Variables globales del juego */
let players = [];
let currentPlayerIndex = 0; // Índice en el arreglo players
let direction = 1; // 1 = sentido horario, -1 = antihorario
let deck = [];
let discardPile = [];
let pendingDraw = 0; // Acumula cartas a robar por efectos (+2, +4)
let skipNext = false;
let currentColor = "";

/* Construir el mazo completo de UNO */
function buildDeck() {
  let newDeck = [];
  const colores = ["rojo", "verde", "azul", "amarillo"];
  
  // Cartas numéricas
  colores.forEach(color => {
    newDeck.push({ color: color, tipo: "numero", numero: 0 });
    for (let i = 1; i <= 9; i++) {
      newDeck.push({ color: color, tipo: "numero", numero: i });
      newDeck.push({ color: color, tipo: "numero", numero: i });
    }
    ["skip", "reverse", "draw2"].forEach(tipo => {
      newDeck.push({ color: color, tipo: tipo });
      newDeck.push({ color: color, tipo: tipo });
    });
  });
  // Cartas comodín
  for (let i = 0; i < 4; i++) {
    newDeck.push({ color: "comodin", tipo: "wild" });
    newDeck.push({ color: "comodin", tipo: "wildDraw4" });
  }
  return newDeck;
}

/* Algoritmo para barajar */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/* Inicializa el juego */
function initializeGame() {
  deck = buildDeck();
  shuffle(deck);
  discardPile = [];
  pendingDraw = 0;
  skipNext = false;
  direction = 1;
  currentColor = "";

  // Jugadores: id 0 = humano, 1 a 3 = CPU  
  // Se renombraron las CPU según lo solicitado.
  players = [
    { id: 0, name: "Tú", type: "human", hand: [] },
    { id: 1, name: "Messi", type: "cpu", hand: [], avatar: "imagenes/cpu1.png" },
    { id: 2, name: "Cristiano", type: "cpu", hand: [], avatar: "imagenes/cpu2.png" },
    { id: 3, name: "Neymar", type: "cpu", hand: [], avatar: "imagenes/cpu3.png" }
  ];
  
  // Repartir 7 cartas a cada jugador
  for (let i = 0; i < 7; i++) {
    players.forEach(player => {
      player.hand.push(deck.shift());
    });
  }
  
  // Primera carta de descarte (no puede ser comodín)
  let firstCard;
  do {
    firstCard = deck.shift();
    if (firstCard.tipo === "wild" || firstCard.tipo === "wildDraw4") {
      deck.push(firstCard);
    } else {
      discardPile.push(firstCard);
      currentColor = (firstCard.color === "comodin") ? "" : firstCard.color;
      break;
    }
  } while (true);
  
  currentPlayerIndex = Math.floor(Math.random() * players.length);
  renderGame();
  renderCenter();
  updateTurnInfo();
  
  // Limpiar log de jugadas (ahora se inserta lo último arriba)
  document.getElementById("log").innerHTML = "";
  
  // Si el primer turno es CPU, iniciar con retardo
  if (players[currentPlayerIndex].type === "cpu") {
    setTimeout(cpuTurn, 2000);
  }
}

/* Actualiza la información de turno */
function updateTurnInfo() {
  const turnInfo = document.getElementById("turn-info");
  let currentPlayer = players[currentPlayerIndex];
  turnInfo.innerText = `Turno: ${currentPlayer.name} | Color actual: ${currentColor.toUpperCase()}`;
}

/* Registra movimientos en el log (inserta al principio para tener lo último arriba) */
function logMove(message) {
  const logDiv = document.getElementById("log");
  const p = document.createElement("p");
  p.textContent = message;
  logDiv.insertBefore(p, logDiv.firstChild);
}

/* Devuelve una descripción de la carta */
function getCardDescription(card) {
  if (card.tipo === "numero") {
    return `${card.numero} de ${card.color}`;
  } else if (card.tipo === "skip") {
    return `Salta (${card.color})`;
  } else if (card.tipo === "reverse") {
    return `Reversa (${card.color})`;
  } else if (card.tipo === "draw2") {
    return `+2 (${card.color})`;
  } else if (card.tipo === "wild") {
    return `Comodín`;
  } else if (card.tipo === "wildDraw4") {
    return `+4 Comodín`;
  }
  return "";
}

/* Renderiza la interfaz */
function renderGame() {
  renderCpuPlayers();
  renderHumanPlayer();
}

function renderCpuPlayers() {
  const cpuContainer = document.getElementById("cpu-container");
  cpuContainer.innerHTML = "";
  players.filter(p => p.type === "cpu").forEach(cpu => {
    const cpuDiv = document.createElement("div");
    cpuDiv.className = "cpu-player";
    const header = document.createElement("h2");
    header.innerText = cpu.name;
    cpuDiv.appendChild(header);
    const avatar = document.createElement("img");
    avatar.src = cpu.avatar;
    avatar.alt = cpu.name;
    avatar.className = "cpu-avatar";
    cpuDiv.appendChild(avatar);
    const count = document.createElement("div");
    count.className = "cpu-count";
    count.innerText = `Cartas: ${cpu.hand.length}`;
    cpuDiv.appendChild(count);
    cpuContainer.appendChild(cpuDiv);
  });
}

function renderHumanPlayer() {
  const human = players.find(p => p.type === "human");
  const humanDiv = document.getElementById("player-bottom");
  humanDiv.innerHTML = "";
  human.hand.forEach((card, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card " + ((card.color === "comodin") ? "comodin" : card.color);
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
    cardDiv.onclick = function() {
      if (players[currentPlayerIndex].type === "human") {
        humanPlayCard(index);
      }
    };
    humanDiv.appendChild(cardDiv);
  });
}

function renderCenter() {
  const discardDiv = document.getElementById("discard-pile");
  discardDiv.innerHTML = "";
  let topCard = discardPile[discardPile.length - 1];
  const cardDiv = document.createElement("div");
  cardDiv.className = "card " + ((topCard.color === "comodin") ? "comodin" : topCard.color);
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

/* Verifica si una carta es jugable */
function isValidMove(card) {
  let topCard = discardPile[discardPile.length - 1];
  if (card.tipo === "wild" || card.tipo === "wildDraw4") return true;
  if (card.color === currentColor) return true;
  if (card.tipo === "numero" && topCard.tipo === "numero" && card.numero === topCard.numero) return true;
  if (card.tipo === topCard.tipo && card.tipo !== "numero") return true;
  return false;
}

/* Aplica el efecto de la carta jugada */
function processCardEffect(card, player) {
  if (card.tipo !== "wild" && card.tipo !== "wildDraw4") {
    currentColor = card.color;
  }
  if (card.tipo === "skip") {
    skipNext = true;
  }
  if (card.tipo === "reverse") {
    direction *= -1;
  }
  if (card.tipo === "draw2") {
    pendingDraw += 2;
    skipNext = true;
  }
  if (card.tipo === "wild") {
    if (player.type === "human") {
      let chosenColor = prompt("Elige un color: rojo, verde, azul o amarillo").toLowerCase();
      currentColor = (["rojo","verde","azul","amarillo"].includes(chosenColor)) ? chosenColor : "rojo";
    } else {
      const colores = ["rojo", "verde", "azul", "amarillo"];
      currentColor = colores[Math.floor(Math.random() * colores.length)];
    }
  }
  if (card.tipo === "wildDraw4") {
    pendingDraw += 4;
    skipNext = true;
    if (player.type === "human") {
      let chosenColor = prompt("Elige un color: rojo, verde, azul o amarillo").toLowerCase();
      currentColor = (["rojo","verde","azul","amarillo"].includes(chosenColor)) ? chosenColor : "rojo";
    } else {
      const colores = ["rojo", "verde", "azul", "amarillo"];
      currentColor = colores[Math.floor(Math.random() * colores.length)];
    }
  }
}

/* Calcula el siguiente jugador */
function nextPlayer() {
  let nextIndex = currentPlayerIndex;
  if (skipNext) {
    nextIndex = (nextIndex + direction + players.length) % players.length;
    skipNext = false;
  }
  nextIndex = (nextIndex + direction + players.length) % players.length;
  currentPlayerIndex = nextIndex;
}

/* Turno del jugador humano */
function humanPlayCard(cardIndex) {
  let currentPlayer = players[currentPlayerIndex];
  let card = currentPlayer.hand[cardIndex];
  if (!isValidMove(card)) {
    alert("Movimiento inválido. Elige otra carta o roba una.");
    return;
  }
  currentPlayer.hand.splice(cardIndex, 1);
  discardPile.push(card);
  logMove(`Tú jugaste: ${getCardDescription(card)}`);
  processCardEffect(card, currentPlayer);
  renderGame();
  renderCenter();
  
  if (currentPlayer.hand.length === 0) {
    alert("¡Felicidades, ganaste!");
    initializeGame();
    return;
  }
  
  if (pendingDraw > 0) {
    nextPlayer();
    applyPendingDraw(players[currentPlayerIndex]);
    return;
  }
  
  nextPlayer();
  updateTurnInfo();
  if (players[currentPlayerIndex].type === "cpu") {
    setTimeout(cpuTurn, 2000);
  }
}

/* Robo de carta para el humano */
function humanDrawCard() {
  if (players[currentPlayerIndex].type !== "human") return;
  let drawnCard = drawCardFromDeck();
  players[currentPlayerIndex].hand.push(drawnCard);
  renderGame();
  logMove("Tú robaste una carta.");
  
  if (isValidMove(drawnCard)) {
    if (confirm("¿Quieres jugar la carta que robaste?")) {
      humanPlayCard(players[currentPlayerIndex].hand.length - 1);
      return;
    }
  }
  
  nextPlayer();
  updateTurnInfo();
  if (players[currentPlayerIndex].type === "cpu") {
    setTimeout(cpuTurn, 2000);
  }
}

/* Turno de CPU */
function cpuTurn() {
  let currentPlayer = players[currentPlayerIndex];
  if (pendingDraw > 0) {
    applyPendingDraw(currentPlayer);
    return;
  }
  
  let played = false;
  for (let i = 0; i < currentPlayer.hand.length; i++) {
    let card = currentPlayer.hand[i];
    if (isValidMove(card)) {
      currentPlayer.hand.splice(i, 1);
      discardPile.push(card);
      let message = `${currentPlayer.name} jugó: ${getCardDescription(card)}`;
      let nextIndex = (currentPlayerIndex + direction + players.length) % players.length;
      if (card.tipo === "skip") {
        message += ` y saltó a ${players[nextIndex].name}`;
      } else if (card.tipo === "draw2") {
        message += ` y obligó a ${players[nextIndex].name} a robar 2 cartas`;
      } else if (card.tipo === "wild") {
        message += ` y cambió el color a ${currentColor.toUpperCase()}`;
      } else if (card.tipo === "wildDraw4") {
        message += ` y obligó a ${players[nextIndex].name} a robar 4 cartas`;
      } else if (card.tipo === "reverse") {
        message += ` y cambió la dirección`;
      }
      logMove(message);
      processCardEffect(card, currentPlayer);
      played = true;
      break;
    }
  }
  
  if (!played) {
    let drawnCard = drawCardFromDeck();
    currentPlayer.hand.push(drawnCard);
    logMove(`${currentPlayer.name} robó una carta.`);
    if (isValidMove(drawnCard)) {
      setTimeout(() => {
        let index = currentPlayer.hand.indexOf(drawnCard);
        currentPlayer.hand.splice(index, 1);
        discardPile.push(drawnCard);
        let message = `${currentPlayer.name} robó y jugó: ${getCardDescription(drawnCard)}`;
        let nextIndex = (currentPlayerIndex + direction + players.length) % players.length;
        if (drawnCard.tipo === "skip") {
          message += ` y saltó a ${players[nextIndex].name}`;
        } else if (drawnCard.tipo === "draw2") {
          message += ` y obligó a ${players[nextIndex].name} a robar 2 cartas`;
        } else if (drawnCard.tipo === "wild") {
          message += ` y cambió el color a ${currentColor.toUpperCase()}`;
        } else if (drawnCard.tipo === "wildDraw4") {
          message += ` y obligó a ${players[nextIndex].name} a robar 4 cartas`;
        } else if (drawnCard.tipo === "reverse") {
          message += ` y cambió la dirección`;
        }
        logMove(message);
        processCardEffect(drawnCard, currentPlayer);
        renderGame();
        renderCenter();
        if (currentPlayer.hand.length === 0) {
          alert(`${currentPlayer.name} gana la partida.`);
          initializeGame();
          return;
        }
        nextPlayer();
        updateTurnInfo();
        if (players[currentPlayerIndex].type === "cpu") {
          setTimeout(cpuTurn, 2000);
        }
      }, 2000);
      renderGame();
      renderCenter();
      return;
    }
  }
  
  renderGame();
  renderCenter();
  
  if (currentPlayer.hand.length === 0) {
    alert(`${currentPlayer.name} gana la partida.`);
    initializeGame();
    return;
  }
  
  nextPlayer();
  updateTurnInfo();
  if (players[currentPlayerIndex].type === "cpu") {
    setTimeout(cpuTurn, 2000);
  }
}

/* Aplica el efecto de robar cartas pendientes */
function applyPendingDraw(player) {
  for (let i = 0; i < pendingDraw; i++) {
    player.hand.push(drawCardFromDeck());
  }
  logMove(`${player.name} robó ${pendingDraw} carta(s).`);
  pendingDraw = 0;
  renderGame();
  nextPlayer();
  updateTurnInfo();
  if (players[currentPlayerIndex].type === "cpu") {
    setTimeout(cpuTurn, 2000);
  }
}

/* Robo de carta del mazo, rebarajando si es necesario */
function drawCardFromDeck() {
  let card = deck.shift();
  if (!card) {
    let top = discardPile.pop();
    deck = discardPile;
    shuffle(deck);
    discardPile = [top];
    card = deck.shift();
  }
  return card;
}

window.onload = initializeGame;
