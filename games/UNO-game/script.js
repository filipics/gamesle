/* Variables globales del juego */
let players = [];
let currentPlayerIndex = 0; // Índice del jugador actual
let direction = 1; // 1 = sentido horario, -1 = antihorario
let deck = [];
let discardPile = [];
let pendingDraw = 0; // Cartas acumuladas por efectos (+2, +4)
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

/* Algoritmo de barajado (Fisher-Yates) */
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

  // Jugadores: id 0 = humano; 1,2,3 = CPU (se renombran)
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
  
  // Escoger aleatoriamente quién comienza
  currentPlayerIndex = Math.floor(Math.random() * players.length);
  renderGame();
  renderCenter();
  updateTurnInfo();
  
  // Limpiar el historial (último mensaje arriba)
  document.getElementById("log").innerHTML = "";
  
  // Si el primer turno es de una CPU, iniciar con retardo
  if (players[currentPlayerIndex].type === "cpu") {
    setTimeout(cpuTurn, 2000);
  }
}

/* Actualiza la información del turno */
function updateTurnInfo() {
  const turnInfo = document.getElementById("turn-info");
  let currentPlayer = players[currentPlayerIndex];
  turnInfo.innerText = `Turno: ${currentPlayer.name} | Color actual: ${currentColor.toUpperCase()}`;
}

/* Registra un movimiento en el historial (se inserta al principio) */
function logMove(message) {
  const logDiv = document.getElementById("log");
  const p = document.createElement("p");
  p.textContent = message;
  logDiv.insertBefore(p, logDiv.firstChild);
}

/* Devuelve una descripción legible de la carta */
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

/* Función que muestra el overlay para elegir color y devuelve una promesa */
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

/* Renderiza la interfaz completa */
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
    // Asignar un id para animaciones (ej.: cpu-player-1)
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

/* Verifica si la carta es jugable */
function isValidMove(card) {
  let topCard = discardPile[discardPile.length - 1];
  if (card.tipo === "wild" || card.tipo === "wildDraw4") return true;
  if (card.color === currentColor) return true;
  if (card.tipo === "numero" && topCard.tipo === "numero" && card.numero === topCard.numero) return true;
  if (card.tipo === topCard.tipo && card.tipo !== "numero") return true;
  return false;
}

/* Aplica los efectos de la carta jugada. Si se trata de comodín en humano, la selección se hace con overlay. */
function processCardEffect(card, player, skipColorSelection = false) {
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
      if (!skipColorSelection) {
        // En principio, la selección se hace con chooseColor()
      }
    } else {
      const colores = ["rojo", "verde", "azul", "amarillo"];
      currentColor = colores[Math.floor(Math.random() * colores.length)];
    }
  }
  if (card.tipo === "wildDraw4") {
    pendingDraw += 4;
    skipNext = true;
    if (player.type === "human") {
      if (!skipColorSelection) {
        // La selección se hará con chooseColor()
      }
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

/* Animación de robo: crea un elemento que se mueve desde el mazo hasta el área del jugador */
function animateDrawCard(player, callback) {
  let deckElem = document.getElementById("deck");
  let target;
  if (player.type === "human") {
    target = document.getElementById("player-bottom");
  } else {
    target = document.getElementById("cpu-player-" + player.id);
  }
  let cardElem = document.createElement("div");
  cardElem.className = "card animated-card";
  // Opcional: usar el mismo background que el reverso del mazo
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
  
  // Obtener posición destino (centrar en el target)
  let targetRect = target.getBoundingClientRect();
  let targetX = targetRect.left + (targetRect.width - deckRect.width) / 2;
  let targetY = targetRect.top + (targetRect.height - deckRect.height) / 2;
  
  // Forzar reflow
  cardElem.offsetWidth;
  cardElem.style.left = targetX + "px";
  cardElem.style.top = targetY + "px";
  
  cardElem.addEventListener("transitionend", function() {
    cardElem.remove();
    callback();
  });
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
  // Si es comodín, se usa el overlay para elegir color
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
        nextPlayer();
        applyPendingDraw(players[currentPlayerIndex]);
        return;
      }
      nextPlayer();
      updateTurnInfo();
      if (players[currentPlayerIndex].type === "cpu") {
        setTimeout(cpuTurn, 2000);
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
}

/* Robo de carta para el jugador humano con animación */
function humanDrawCard() {
  if (players[currentPlayerIndex].type !== "human") return;
  let drawnCard = drawCardFromDeck();
  animateDrawCard(players[currentPlayerIndex], drawnCard, function() {
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
  });
}

/* Turno de la CPU */
function cpuTurn() {
  let currentPlayer = players[currentPlayerIndex];
  if (pendingDraw > 0) {
    applyPendingDraw(currentPlayer);
    return;
  }
  let played = false;
  // Buscar la primera carta jugable
  for (let i = 0; i < currentPlayer.hand.length; i++) {
    let card = currentPlayer.hand[i];
    if (isValidMove(card)) {
      currentPlayer.hand.splice(i, 1);
      discardPile.push(card);
      processCardEffect(card, currentPlayer);
      let message = `${currentPlayer.name} jugó: ${getCardDescription(card)}`;
      let nextIndex = (currentPlayerIndex + direction + players.length) % players.length;
      if (card.tipo === "skip") {
        message += ` y saltó a ${players[nextIndex].name}`;
      } else if (card.tipo === "draw2") {
        message += ` y obligó a ${players[nextIndex].name} a robar 2 cartas`;
      } else if (card.tipo === "wild") {
        message += ` y cambió el color a ${currentColor.toUpperCase()}`;
      } else if (card.tipo === "wildDraw4") {
        message += ` y obligó a ${players[nextIndex].name} a robar 4 cartas y cambió el color a ${currentColor.toUpperCase()}`;
      } else if (card.tipo === "reverse") {
        message += ` y cambió la dirección`;
      }
      logMove(message);
      played = true;
      break;
    }
  }
  
  if (!played) {
    let drawnCard = drawCardFromDeck();
    animateDrawCard(currentPlayer, drawnCard, function() {
      currentPlayer.hand.push(drawnCard);
      logMove(`${currentPlayer.name} robó una carta.`);
      renderGame();
      if (isValidMove(drawnCard)) {
        setTimeout(() => {
          let index = currentPlayer.hand.indexOf(drawnCard);
          currentPlayer.hand.splice(index, 1);
          discardPile.push(drawnCard);
          processCardEffect(drawnCard, currentPlayer);
          let message = `${currentPlayer.name} robó y jugó: ${getCardDescription(drawnCard)}`;
          let nextIndex = (currentPlayerIndex + direction + players.length) % players.length;
          if (drawnCard.tipo === "skip") {
            message += ` y saltó a ${players[nextIndex].name}`;
          } else if (drawnCard.tipo === "draw2") {
            message += ` y obligó a ${players[nextIndex].name} a robar 2 cartas`;
          } else if (drawnCard.tipo === "wild") {
            message += ` y cambió el color a ${currentColor.toUpperCase()}`;
          } else if (drawnCard.tipo === "wildDraw4") {
            message += ` y obligó a ${players[nextIndex].name} a robar 4 cartas y cambió el color a ${currentColor.toUpperCase()}`;
          } else if (drawnCard.tipo === "reverse") {
            message += ` y cambió la dirección`;
          }
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
          if (players[currentPlayerIndex].type === "cpu") {
            setTimeout(cpuTurn, 2000);
          }
        }, 2000);
        renderGame();
        renderCenter();
        return;
      } else {
        nextPlayer();
        updateTurnInfo();
        if (players[currentPlayerIndex].type === "cpu") {
          setTimeout(cpuTurn, 2000);
        }
      }
    });
  } else {
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
}

/* Aplica el efecto de robar cartas pendientes (se anima cada robo de forma secuencial) */
function applyPendingDraw(player) {
  let count = pendingDraw;
  pendingDraw = 0;
  function drawNext(i) {
    if (i < count) {
      let card = drawCardFromDeck();
      animateDrawCard(player, card, function() {
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

/* Función auxiliar para robar una carta, rebarajando si es necesario */
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

/* Función para animar el robo de una carta: crea un elemento que se mueve desde el mazo hasta el área del jugador */
function animateDrawCard(player, drawnCard, callback) {
  let deckElem = document.getElementById("deck");
  let target;
  if (player.type === "human") {
    target = document.getElementById("player-bottom");
  } else {
    target = document.getElementById("cpu-player-" + player.id);
  }
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
  
  // Forzar reflow
  cardElem.offsetWidth;
  cardElem.style.left = targetX + "px";
  cardElem.style.top = targetY + "px";
  
  cardElem.addEventListener("transitionend", function() {
    cardElem.remove();
    callback();
  });
}

window.onload = initializeGame;
