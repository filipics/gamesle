/* VARIABLES GLOBALES */
let players = [];
let currentPlayerIndex = 0; // Índice del jugador actual
let direction = 1; // 1 = sentido horario, -1 = antihorario
let deck = [];
let discardPile = [];
let pendingDraw = 0; // Cantidad de cartas que debe robar el siguiente jugador (por +2 o +4)
let skipNext = false;
let currentColor = "";

/* CONSTRUCCIÓN DEL MAZO */
function buildDeck() {
  let newDeck = [];
  const colores = ["rojo", "verde", "azul", "amarillo"];
  // Cartas numéricas y especiales
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

/* BARAJAR (Fisher-Yates) */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/* INICIALIZAR EL JUEGO */
function initializeGame() {
  deck = buildDeck();
  shuffle(deck);
  discardPile = [];
  pendingDraw = 0;
  skipNext = false;
  direction = 1;
  currentColor = "";

  // Configurar jugadores: id 0 = humano; 1,2,3 = CPU (con nombres fijos)
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
  
  // Seleccionar la primera carta para la pila de descarte (que no sea comodín)
  let firstCard;
  do {
    firstCard = deck.shift();
    if (firstCard.tipo === "wild" || firstCard.tipo === "wildDraw4") {
      deck.push(firstCard);
    } else {
      discardPile.push(firstCard);
      currentColor = firstCard.color;
      break;
    }
  } while (true);
  
  // Escoger al azar quién comienza
  currentPlayerIndex = Math.floor(Math.random() * players.length);
  renderGame();
  renderCenter();
  updateTurnInfo();
  document.getElementById("log").innerHTML = ""; // Limpiar historial

  // Si el primer turno es CPU, iniciarlo con retardo
  if (players[currentPlayerIndex].type === "cpu") {
    setTimeout(cpuTurn, 2000);
  }
}

/* FUNCIONES DE UTILIDAD */
function updateTurnInfo() {
  const turnInfo = document.getElementById("turn-info");
  let currentPlayer = players[currentPlayerIndex];
  turnInfo.innerText = `Turno: ${currentPlayer.name} | Color actual: ${currentColor.toUpperCase()}`;
}

function logMove(message) {
  const logDiv = document.getElementById("log");
  const p = document.createElement("p");
  p.textContent = message;
  logDiv.insertBefore(p, logDiv.firstChild);
}

function getCardDescription(card) {
  if (card.tipo === "numero") return `${card.numero} de ${card.color}`;
  if (card.tipo === "skip") return `Salta (${card.color})`;
  if (card.tipo === "reverse") return `Reversa (${card.color})`;
  if (card.tipo === "draw2") return `+2 (${card.color})`;
  if (card.tipo === "wild") return `Comodín`;
  if (card.tipo === "wildDraw4") return `+4 Comodín`;
  return "";
}

/* SELECCIÓN DE COLOR CON OVERLAY (DEVUELVE PROMESA CON EL COLOR SELECCIONADO) */
function chooseColor() {
  return new Promise((resolve) => {
    const picker = document.getElementById("color-picker");
    picker.classList.remove("hidden");
    const options = document.querySelectorAll(".color-option");
    const handler = (event) => {
      const color = event.target.getAttribute("data-color");
      options.forEach(opt => opt.removeEventListener("click", handler));
      picker.classList.add("hidden");
      resolve(color);
    };
    options.forEach(opt => {
      opt.addEventListener("click", handler);
    });
  });
}

/* TERMINAR EL TURNO: avanza el turno y, si es CPU, llama a cpuTurn con retardo */
function endTurn() {
  nextPlayer();
  updateTurnInfo();
  if (players[currentPlayerIndex].type === "cpu") {
    setTimeout(cpuTurn, 2000);
  }
}

/* RENDERIZACIÓN DE LA INTERFAZ */
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
    cpuDiv.id = "cpu-player-" + cpu.id;
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
    if (card.tipo === "numero") cardDiv.innerText = card.numero;
    else if (card.tipo === "skip") cardDiv.innerText = "⏭";
    else if (card.tipo === "reverse") cardDiv.innerText = "🔄";
    else if (card.tipo === "draw2") cardDiv.innerText = "+2";
    else if (card.tipo === "wild") cardDiv.innerText = "✳";
    else if (card.tipo === "wildDraw4") cardDiv.innerText = "+4";
    cardDiv.onclick = function() {
      if (players[currentPlayerIndex].type === "human") humanPlayCard(index);
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
  if (topCard.tipo === "numero") cardDiv.innerText = topCard.numero;
  else if (topCard.tipo === "skip") cardDiv.innerText = "⏭";
  else if (topCard.tipo === "reverse") cardDiv.innerText = "🔄";
  else if (topCard.tipo === "draw2") cardDiv.innerText = "+2";
  else if (topCard.tipo === "wild") cardDiv.innerText = "✳";
  else if (topCard.tipo === "wildDraw4") cardDiv.innerText = "+4";
  discardDiv.appendChild(cardDiv);
}

/* VERIFICAR SI UNA CARTA ES JUGABLE */
function isValidMove(card) {
  let topCard = discardPile[discardPile.length - 1];
  if (card.tipo === "wild" || card.tipo === "wildDraw4") return true;
  if (card.color === currentColor) return true;
  if (card.tipo === "numero" && topCard.tipo === "numero" && card.numero === topCard.numero) return true;
  if (card.tipo === topCard.tipo && card.tipo !== "numero") return true;
  return false;
}

/* PROCESAR LOS EFECTOS DE LA CARTA JUGADA */
function processCardEffect(card, player, skipColorSelection = false) {
  // Si la carta no es comodín, actualizar el color
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
    if (player.type === "cpu") {
      const opciones = ["rojo", "verde", "azul", "amarillo"];
      currentColor = opciones[Math.floor(Math.random() * opciones.length)];
    }
    // Para humano, currentColor se establece mediante chooseColor()
  }
  if (card.tipo === "wildDraw4") {
    pendingDraw += 4;
    skipNext = true;
    if (player.type === "cpu") {
      const opciones = ["rojo", "verde", "azul", "amarillo"];
      currentColor = opciones[Math.floor(Math.random() * opciones.length)];
    }
  }
}

/* CALCULAR EL SIGUIENTE JUGADOR */
function nextPlayer() {
  let nextIndex = currentPlayerIndex;
  if (skipNext) {
    nextIndex = (nextIndex + direction + players.length) % players.length;
    skipNext = false;
  }
  nextIndex = (nextIndex + direction + players.length) % players.length;
  currentPlayerIndex = nextIndex;
}

/* ANIMAR EL ROBO DE UNA CARTA: crea un elemento que se mueve desde el mazo hasta el área del jugador */
function animateDrawCard(player, callback) {
  let deckElem = document.getElementById("deck");
  let target = (player.type === "human")
    ? document.getElementById("player-bottom")
    : document.getElementById("cpu-player-" + player.id);
  let cardElem = document.createElement("div");
  cardElem.className = "card animated-card";
  cardElem.style.backgroundImage = deckElem.style.backgroundImage;
  cardElem.style.backgroundSize = deckElem.style.backgroundSize;
  cardElem.style.position = "fixed";
  let deckRect = deckElem.getBoundingClientRect();
  cardElem.style.left = deckRect.left + "px";
  cardElem.style.top = deckRect.top + "px";
  cardElem.style.width = deckRect.width + "px";
  cardElem.style.height = deckRect.height + "px";
  cardElem.style.transition = "all 0.8s ease-out";
  document.body.appendChild(cardElem);
  let targetRect = target.getBoundingClientRect();
  let targetX = targetRect.left + (targetRect.width - deckRect.width) / 2;
  let targetY = targetRect.top + (targetRect.height - deckRect.height) / 2;
  cardElem.offsetWidth; // Forzar reflow
  cardElem.style.left = targetX + "px";
  cardElem.style.top = targetY + "px";
  cardElem.addEventListener("transitionend", function() {
    cardElem.remove();
    callback();
  });
}

/* TURNO DEL JUGADOR HUMANO */
function humanPlayCard(cardIndex) {
  let currentPlayer = players[currentPlayerIndex];
  let card = currentPlayer.hand[cardIndex];
  if (!isValidMove(card)) {
    alert("Movimiento inválido. Elige otra carta o roba una.");
    return;
  }
  currentPlayer.hand.splice(cardIndex, 1);
  discardPile.push(card);
  if ((card.tipo === "wild" || card.tipo === "wildDraw4") && currentPlayer.type === "human") {
    chooseColor().then(chosenColor => {
      currentColor = chosenColor;
      processCardEffect(card, currentPlayer, true);
      logMove(`Tú jugaste: ${getCardDescription(card)} y cambiaste el color a ${currentColor.toUpperCase()}`);
      renderGame();
      renderCenter();
      if (currentPlayer.hand.length === 0) {
        alert("¡Felicidades, ganaste!");
        initializeGame();
        return;
      }
      if (pendingDraw > 0) {
        applyPendingDraw(currentPlayer, endTurn);
      } else {
        endTurn();
      }
    });
  } else {
    processCardEffect(card, currentPlayer);
    logMove(`Tú jugaste: ${getCardDescription(card)}`);
    renderGame();
    renderCenter();
    if (currentPlayer.hand.length === 0) {
      alert("¡Felicidades, ganaste!");
      initializeGame();
      return;
    }
    if (pendingDraw > 0) {
      applyPendingDraw(currentPlayer, endTurn);
    } else {
      endTurn();
    }
  }
}

/* ROBAR CARTA PARA HUMANO CON ANIMACIÓN (NO SE AUTO-PLAY) */
function humanDrawCard() {
  if (players[currentPlayerIndex].type !== "human") return;
  let drawnCard = drawCardFromDeck();
  animateDrawCard(players[currentPlayerIndex], function() {
    players[currentPlayerIndex].hand.push(drawnCard);
    logMove("Tú robaste una carta.");
    renderGame();
    // En turno humano, no se auto-juega la carta robada; el jugador debe elegir manualmente