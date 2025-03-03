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

  // Configurar jugadores: id 0 es humano; 1,2,3 son CPU con nombres fijos
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
  
  // Elegir la primera carta para la pila de descarte (que no sea comodín)
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
  
  // Elegir al azar quién comienza
  currentPlayerIndex = Math.floor(Math.random() * players.length);
  renderGame();
  renderCenter();
  updateTurnInfo();
  document.getElementById("log").innerHTML = ""; // Limpiar historial

  // Si el primer turno es de CPU, iniciar después de 2 segundos
  if (players[currentPlayerIndex].type === "cpu") {
    setTimeout(cpuTurn, 2000);
  }
}

/* ACTUALIZAR INFORMACIÓN DE TURNO */
function updateTurnInfo() {
  const turnInfo = document.getElementById("turn-info");
  let currentPlayer = players[currentPlayerIndex];
  turnInfo.innerText = `Turno: ${currentPlayer.name} | Color actual: ${currentColor.toUpperCase()}`;
}

/* REGISTRAR UN MENSAJE EN EL HISTORIAL (inserta siempre al principio) */
function logMove(message) {
  const logDiv = document.getElementById("log");
  const p = document.createElement("p");
  p.textContent = message;
  logDiv.insertBefore(p, logDiv.firstChild);
}

/* DEVUELVE UNA DESCRIPCIÓN LEGIBLE DE UNA CARTA */
function getCardDescription(card) {
  if (card.tipo === "numero") return `${card.numero} de ${card.color}`;
  if (card.tipo === "skip") return `Salta (${card.color})`;
  if (card.tipo === "reverse") return `Reversa (${card.color})`;
  if (card.tipo === "draw2") return `+2 (${card.color})`;
  if (card.tipo === "wild") return `Comodín`;
  if (card.tipo === "wildDraw4") return `+4 Comodín`;
  return "";
}

/* SELECCIÓN DE COLOR CON OVERLAY (DEVUELVE PROMESA CON COLOR) */
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

/* RENDERIZAR LA INTERFAZ */
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
  // Si la carta no es comodín, actualiza el color
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
    // Para humano, currentColor se habrá establecido mediante chooseColor
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

/* ANIMAR EL ROBO DE UNA CARTA (mueve un elemento desde el mazo hasta el área del jugador) */
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
  // Forzar reflow para activar la transición
  cardElem.offsetWidth;
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
    // Usar overlay para elegir color (sin prompt)
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
        nextPlayer();
        applyPendingDraw(players[currentPlayerIndex]);
        return;
      }
      nextPlayer();
      updateTurnInfo();
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
      nextPlayer();
      applyPendingDraw(players[currentPlayerIndex]);
      return;
    }
    nextPlayer();
    updateTurnInfo();
  }
}

/* ROBAR CARTA PARA HUMANO CON ANIMACIÓN */
function humanDrawCard() {
  if (players[currentPlayerIndex].type !== "human") return;
  let drawnCard = drawCardFromDeck();
  animateDrawCard(players[currentPlayerIndex], function() {
    players[currentPlayerIndex].hand.push(drawnCard);
    logMove("Tú robaste una carta.");
    renderGame();
    if (isValidMove(drawnCard)) {
      if (confirm("¿Quieres jugar la carta que robaste?")) {
        humanPlayCard(players[currentPlayerIndex].hand.length - 1);
        return;
      }
    }
    nextPlayer();
    updateTurnInfo();
  });
}

/* TURNO DE LA CPU (versión simplificada) */
function cpuTurn() {
  let currentPlayer = players[currentPlayerIndex];
  // Si hay efecto pendiente, aplicarlo y terminar turno
  if (pendingDraw > 0) {
    applyPendingDraw(currentPlayer);
    return;
  }
  // Buscar una carta jugable en la mano
  let cardIndex = currentPlayer.hand.findIndex(card => isValidMove(card));
  if (cardIndex !== -1) {
    let card = currentPlayer.hand.splice(cardIndex, 1)[0];
    discardPile.push(card);
    processCardEffect(card, currentPlayer);
    let nextIndex = (currentPlayerIndex + direction + players.length) % players.length;
    let message = `${currentPlayer.name} jugó: ${getCardDescription(card)}`;
    if (card.tipo === "skip") message += ` y saltó a ${players[nextIndex].name}`;
    else if (card.tipo === "draw2") message += ` y obligó a ${players[nextIndex].name} a robar 2 cartas`;
    else if (card.tipo === "wild") message += ` y cambió el color a ${currentColor.toUpperCase()}`;
    else if (card.tipo === "wildDraw4") message += ` y obligó a ${players[nextIndex].name} a robar 4 cartas y cambió el color a ${currentColor.toUpperCase()}`;
    else if (card.tipo === "reverse") message += ` y cambió la dirección`;
    logMove(message);
    renderGame();
    renderCenter();
    if (currentPlayer.hand.length === 0) {
      alert(`${currentPlayer.name} gana la partida.`);
      initializeGame();
      return;
    }
    nextPlayer();
    updateTurnInfo();
    setTimeout(cpuTurn, 2000);
  } else {
    // Si no hay carta jugable, robar 1 carta
    let drawnCard = drawCardFromDeck();
    animateDrawCard(currentPlayer, function() {
      currentPlayer.hand.push(drawnCard);
      logMove(`${currentPlayer.name} robó una carta.`);
      renderGame();
      if (isValidMove(drawnCard)) {
        // Jugar la carta robada automáticamente
        setTimeout(() => {
          let idx = currentPlayer.hand.indexOf(drawnCard);
          if (idx !== -1) {
            currentPlayer.hand.splice(idx, 1);
            discardPile.push(drawnCard);
            processCardEffect(drawnCard, currentPlayer);
            let nextIndex = (currentPlayerIndex + direction + players.length) % players.length;
            let message = `${currentPlayer.name} robó y jugó: ${getCardDescription(drawnCard)}`;
            if (drawnCard.tipo === "skip") message += ` y saltó a ${players[nextIndex].name}`;
            else if (drawnCard.tipo === "draw2") message += ` y obligó a ${players[nextIndex].name} a robar 2 cartas`;
            else if (drawnCard.tipo === "wild") message += ` y cambió el color a ${currentColor.toUpperCase()}`;
            else if (drawnCard.tipo === "wildDraw4") message += ` y obligó a ${players[nextIndex].name} a robar 4 cartas y cambió el color a ${currentColor.toUpperCase()}`;
            else if (drawnCard.tipo === "reverse") message += ` y cambió la dirección`;
            logMove(message);
            renderGame();
            renderCenter();
            if (currentPlayer.hand.length === 0) {
              alert(`${currentPlayer.name} gana la partida.`);
              initializeGame();
              return;
            }
            nextPlayer();
            updateTurnInfo();
            setTimeout(cpuTurn, 2000);
          }
        }, 2000);
      } else {
        nextPlayer();
        updateTurnInfo();
        setTimeout(cpuTurn, 2000);
      }
    });
  }
}

/* APLICAR EFECTO DE ROBAR CARTAS PENDIENTES (se ejecuta solo una vez por turno) */
function applyPendingDraw(player) {
  let count = pendingDraw;
  pendingDraw = 0; // Se resetea para que no se acumulen
  function drawNext(i) {
    if (i < count) {
      let card = drawCardFromDeck();
      animateDrawCard(player, function() {
        player.hand.push(card);
        logMove(`${player.name} robó una carta.`);
        renderGame();
        drawNext(i + 1);
      });
    } else {
      nextPlayer();
      updateTurnInfo();
      if (players[currentPlayerIndex].type === "cpu") {
        setTimeout(cpuTurn, 2000);
      }
    }
  }
  drawNext(0);
}

/* ROBAR CARTA DEL MAZO (rebaraja la pila de descarte si es necesario) */
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

/* ANIMAR EL ROBO: crea un elemento que se mueve desde el mazo hasta el área del jugador */
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

/* INICIAR EL JUEGO AL CARGAR LA PÁGINA */
window.onload = initializeGame;