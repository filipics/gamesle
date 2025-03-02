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
    // Una carta 0
    newDeck.push({ color: color, tipo: "numero", numero: 0 });
    // Dos de cada carta del 1 al 9
    for (let i = 1; i <= 9; i++) {
      newDeck.push({ color: color, tipo: "numero", numero: i });
      newDeck.push({ color: color, tipo: "numero", numero: i });
    }
    // Cartas especiales: skip, reverse y draw2 (dos de cada)
    ["skip", "reverse", "draw2"].forEach(tipo => {
      newDeck.push({ color: color, tipo: tipo });
      newDeck.push({ color: color, tipo: tipo });
    });
  });
  // Cartas comodín: wild y wildDraw4 (cuatro de cada)
  for (let i = 0; i < 4; i++) {
    newDeck.push({ color: "comodin", tipo: "wild" });
    newDeck.push({ color: "comodin", tipo: "wildDraw4" });
  }
  return newDeck;
}

/* Algoritmo para barajar (Fisher-Yates) */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/* Inicializa el juego */
function initializeGame() {
  // Reiniciar variables globales
  deck = buildDeck();
  shuffle(deck);
  discardPile = [];
  pendingDraw = 0;
  skipNext = false;
  direction = 1;
  currentColor = "";

  // Inicializar jugadores: el índice 0 es el jugador humano
  players = [
    { id: 0, name: "Tú", type: "human", hand: [] },
    { id: 1, name: "CPU 1", type: "cpu", hand: [], avatar: "imagenes/cpu1.png" },
    { id: 2, name: "CPU 2", type: "cpu", hand: [], avatar: "imagenes/cpu2.png" },
    { id: 3, name: "CPU 3", type: "cpu", hand: [], avatar: "imagenes/cpu3.png" }
  ];
  
  // Reparte 7 cartas a cada jugador
  for (let i = 0; i < 7; i++) {
    players.forEach(player => {
      player.hand.push(deck.shift());
    });
  }
  
  // Definir la primera carta para la pila de descarte (no debe ser comodín)
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
  
  // Escoge aleatoriamente quién empieza
  currentPlayerIndex = Math.floor(Math.random() * players.length);
  renderGame();
  renderCenter();
  updateTurnInfo();
  
  // Si el primer turno es de la CPU, lanza la jugada automática
  if (players[currentPlayerIndex].type === "cpu") {
    setTimeout(cpuTurn, 1000);
  }
}

/* Actualiza la información de turno */
function updateTurnInfo() {
  const turnInfo = document.getElementById("turn-info");
  let currentPlayer = players[currentPlayerIndex];
  turnInfo.innerText = `Turno: ${currentPlayer.name} | Color actual: ${currentColor.toUpperCase()}`;
}

/* Muestra mensajes temporales */
function showMessage(text) {
  const msgDiv = document.getElementById("message");
  msgDiv.innerText = text;
  setTimeout(() => { msgDiv.innerText = ""; }, 3000);
}

/* Renderiza toda la mesa de juego */
function renderGame() {
  renderPlayerArea("player-bottom", players.find(p => p.type === "human"));
  // Para las CPU, asignamos cada una según su id (1, 2 y 3)
  renderPlayerArea("player-top", players.find(p => p.id === 1));
  renderPlayerArea("player-left", players.find(p => p.id === 2));
  renderPlayerArea("player-right", players.find(p => p.id === 3));
}

/* Renderiza un área de jugador (CPU o humano) */
function renderPlayerArea(areaId, player) {
  const area = document.getElementById(areaId);
  area.innerHTML = "";
  
  // Encabezado con nombre y, en CPU, avatar
  let header = document.createElement("h2");
  header.innerText = player.name;
  area.appendChild(header);
  
  if (player.type === "cpu") {
    // Si es CPU, mostrar avatar y cantidad de cartas
    let avatar = document.createElement("img");
    avatar.src = player.avatar;
    avatar.alt = player.name;
    avatar.className = "cpu-avatar";
    area.appendChild(avatar);
    
    let count = document.createElement("div");
    count.className = "cpu-count";
    count.innerText = `Cartas: ${player.hand.length}`;
    area.appendChild(count);
  } else {
    // Si es humano, mostrar las cartas (caras visibles)
    let handDiv = document.createElement("div");
    player.hand.forEach((card, index) => {
      let cardDiv = document.createElement("div");
      cardDiv.className = "card " + ((card.color === "comodin") ? "comodin" : card.color);
      // Mostrar el número o símbolo según el tipo
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
      // Hacer clic para jugar la carta solo si es el turno humano
      cardDiv.onclick = function() {
        if (players[currentPlayerIndex].type === "human") {
          humanPlayCard(index);
        }
      };
      handDiv.appendChild(cardDiv);
    });
    area.appendChild(handDiv);
  }
}

/* Renderiza el centro: mazo y pila de descarte */
function renderCenter() {
  // Pila de descarte
  const discardDiv = document.getElementById("discard-pile");
  discardDiv.innerHTML = "";
  let topCard = discardPile[discardPile.length - 1];
  let cardDiv = document.createElement("div");
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

/* Verifica si la carta jugada es válida */
function isValidMove(card) {
  let topCard = discardPile[discardPile.length - 1];
  // Los comodines se pueden jugar siempre
  if (card.tipo === "wild" || card.tipo === "wildDraw4") return true;
  // Coincidencia de color
  if (card.color === currentColor) return true;
  // Si ambas son cartas numéricas y coinciden los números
  if (card.tipo === "numero" && topCard.tipo === "numero" && card.numero === topCard.numero) return true;
  // Coincidencia de cartas especiales (skip, reverse, draw2)
  if (card.tipo === topCard.tipo && card.tipo !== "numero") return true;
  return false;
}

/* Aplica el efecto de la carta jugada */
function processCardEffect(card, player) {
  // Si la carta no es un comodín, actualiza el color
  if (card.tipo !== "wild" && card.tipo !== "wildDraw4") {
    currentColor = card.color;
  }
  
  // Efectos según el tipo de carta
  if (card.tipo === "skip") {
    skipNext = true;
  }
  if (card.tipo === "reverse") {
    // En 4 jugadores reverse cambia la dirección
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

/* Función para obtener el siguiente jugador */
function nextPlayer() {
  let nextIndex = currentPlayerIndex;
  // Si se debe saltar turno, avanzamos dos veces
  if (skipNext) {
    nextIndex = (nextIndex + direction + players.length) % players.length;
    skipNext = false;
  }
  nextIndex = (nextIndex + direction + players.length) % players.length;
  currentPlayerIndex = nextIndex;
}

/* Lógica para el turno del jugador humano */
function humanPlayCard(cardIndex) {
  let currentPlayer = players[currentPlayerIndex];
  let card = currentPlayer.hand[cardIndex];
  if (!isValidMove(card)) {
    showMessage("Movimiento inválido. Elige otra carta o roba una.");
    return;
  }
  // Elimina la carta de la mano y la coloca en la pila de descarte
  currentPlayer.hand.splice(cardIndex, 1);
  discardPile.push(card);
  processCardEffect(card, currentPlayer);
  renderGame();
  renderCenter();
  
  // Verificar si ganó
  if (currentPlayer.hand.length === 0) {
    alert(`¡${currentPlayer.name} gana la partida!`);
    initializeGame();
    return;
  }
  
  // Si hay cartas pendientes por efectos, se aplican al siguiente jugador
  if (pendingDraw > 0) {
    nextPlayer();
    applyPendingDraw(players[currentPlayerIndex]);
    return;
  }
  
  // Avanzar turno
  nextPlayer();
  updateTurnInfo();
  if (players[currentPlayerIndex].type === "cpu") {
    setTimeout(cpuTurn, 1000);
  }
}

/* Función para que el jugador humano robe carta al hacer clic en el mazo */
function humanDrawCard() {
  if (players[currentPlayerIndex].type !== "human") return;
  let drawnCard = drawCardFromDeck();
  players[currentPlayerIndex].hand.push(drawnCard);
  renderGame();
  showMessage("Has robado una carta.");
  
  // Si la carta robada es jugable, preguntar si desea jugarla de inmediato
  if (isValidMove(drawnCard)) {
    if (confirm("¿Quieres jugar la carta que robaste?")) {
      humanPlayCard(players[currentPlayerIndex].hand.length - 1);
      return;
    }
  }
  
  // Pasa el turno
  nextPlayer();
  updateTurnInfo();
  if (players[currentPlayerIndex].type === "cpu") {
    setTimeout(cpuTurn, 1000);
  }
}

/* Función para que una CPU realice su jugada */
function cpuTurn() {
  let currentPlayer = players[currentPlayerIndex];
  // Si hay cartas pendientes, la CPU debe robar
  if (pendingDraw > 0) {
    applyPendingDraw(currentPlayer);
    return;
  }
  
  // Buscar la primera carta válida
  let played = false;
  for (let i = 0; i < currentPlayer.hand.length; i++) {
    let card = currentPlayer.hand[i];
    if (isValidMove(card)) {
      currentPlayer.hand.splice(i, 1);
      discardPile.push(card);
      showMessage(`${currentPlayer.name} jugó una carta.`);
      processCardEffect(card, currentPlayer);
      played = true;
      break;
    }
  }
  
  // Si no pudo jugar, roba carta
  if (!played) {
    let drawnCard = drawCardFromDeck();
    currentPlayer.hand.push(drawnCard);
    showMessage(`${currentPlayer.name} robó una carta.`);
    // Si la carta robada es jugable, la juega automáticamente
    if (isValidMove(drawnCard)) {
      setTimeout(() => {
        let index = currentPlayer.hand.indexOf(drawnCard);
        currentPlayer.hand.splice(index, 1);
        discardPile.push(drawnCard);
        showMessage(`${currentPlayer.name} jugó la carta robada.`);
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
          setTimeout(cpuTurn, 1000);
        }
      }, 1000);
      renderGame();
      renderCenter();
      return;
    }
  }
  
  renderGame();
  renderCenter();
  
  // Verificar victoria
  if (currentPlayer.hand.length === 0) {
    alert(`${currentPlayer.name} gana la partida.`);
    initializeGame();
    return;
  }
  
  nextPlayer();
  updateTurnInfo();
  if (players[currentPlayerIndex].type === "cpu") {
    setTimeout(cpuTurn, 1000);
  }
}

/* Aplica el efecto de robar cartas pendientes por +2 o +4 */
function applyPendingDraw(player) {
  for (let i = 0; i < pendingDraw; i++) {
    player.hand.push(drawCardFromDeck());
  }
  showMessage(`${player.name} robó ${pendingDraw} carta(s).`);
  pendingDraw = 0;
  renderGame();
  nextPlayer();
  updateTurnInfo();
  if (players[currentPlayerIndex].type === "cpu") {
    setTimeout(cpuTurn, 1000);
  }
}

/* Función auxiliar para robar una carta, rebarajando si es necesario */
function drawCardFromDeck() {
  let card = deck.shift();
  if (!card) {
    // Si el mazo se acabó, rebarajar la pila de descarte excepto la última carta
    let top = discardPile.pop();
    deck = discardPile;
    shuffle(deck);
    discardPile = [top];
    card = deck.shift();
  }
  return card;
}

window.onload = initializeGame;
