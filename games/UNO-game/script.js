// Variables y funciones para crear y barajar el mazo
let deck = [];
const colores = ['rojo', 'amarillo', 'verde', 'azul'];
const numeros = ['0','1','2','3','4','5','6','7','8','9'];

function crearDeck() {
  deck = [];
  colores.forEach(color => {
    numeros.forEach(numero => {
      deck.push({ color, numero });
      if (numero !== '0') {
        deck.push({ color, numero }); // Dos cartas para cada número, excepto el 0
      }
    });
    // Agregar cartas especiales: skip, reverse, drawTwo
    ['skip', 'reverse', 'drawTwo'].forEach(tipo => {
      deck.push({ color, numero: tipo });
      deck.push({ color, numero: tipo });
    });
  });
  // Agregar cartas comodín (wild y wildDrawFour)
  for (let i = 0; i < 4; i++) {
    deck.push({ color: 'comodin', numero: 'wild' });
    deck.push({ color: 'comodin', numero: 'wildDrawFour' });
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Se usa un array "hands" para almacenar las manos de los 4 jugadores
// Índice 0: jugador humano, índices 1-3: jugadores de la PC
let hands = [[], [], [], []];
let discardPile = [];

// Variable que controla el turno: 0 es humano, 1 a 3 son PCs
let currentPlayer = 0;

// Repartir 7 cartas a cada jugador y sacar una para iniciar la pila de descartes
function repartirCartas() {
  for (let i = 0; i < 7; i++) {
    for (let p = 0; p < 4; p++) {
      hands[p].push(deck.pop());
    }
  }
  discardPile.push(deck.pop());
}

// Función para actualizar la interfaz (manos, pila de descartes y turno)
function renderHands() {
  // Renderizar manos de las PCs
  for (let p = 1; p < 4; p++) {
    const compDiv = document.querySelector(`#computer-hand-${p}`);
    const cardsDiv = compDiv.querySelector('.cards');
    cardsDiv.innerHTML = '';
    hands[p].forEach(() => {
      const cardElem = document.createElement('div');
      cardElem.className = 'card';
      cardElem.textContent = '🂠';
      cardsDiv.appendChild(cardElem);
    });
    // Actualizar el título con la cantidad de cartas
    const header = compDiv.querySelector('h2');
    header.textContent = `PC ${p} (${hands[p].length} cartas)`;
  }
  
  // Renderizar la mano del jugador humano
  const playerDiv = document.querySelector('#player-hand .cards');
  playerDiv.innerHTML = '';
  hands[0].forEach((carta, index) => {
    const cardElem = document.createElement('div');
    cardElem.className = 'card';
    cardElem.textContent = `${carta.color} ${carta.numero}`;
    // Solo se añade el evento de click si es el turno del jugador humano
    if (currentPlayer === 0) {
      cardElem.addEventListener('click', () => jugarCarta(index));
    }
    playerDiv.appendChild(cardElem);
  });
  
  // Mostrar la última carta en la pila de descartes
  const discardDiv = document.querySelector('#discard-pile .card');
  const ultimaCarta = discardPile[discardPile.length - 1];
  discardDiv.textContent = `${ultimaCarta.color} ${ultimaCarta.numero}`;
  
  // Indicador de turno
  const turnIndicator = document.getElementById('turn-indicator');
  if (currentPlayer === 0) {
    turnIndicator.textContent = "Tu turno";
  } else {
    turnIndicator.textContent = `Turno de PC ${currentPlayer}`;
  }
  
  // Habilitar o deshabilitar el botón de "Robar Carta" según el turno
  const drawButton = document.getElementById('draw-card');
  drawButton.disabled = (currentPlayer !== 0);
}

// Función para validar si la jugada es válida
function isValidMove(carta, ultimaCarta) {
  return carta.color === 'comodin' || carta.color === ultimaCarta.color || carta.numero === ultimaCarta.numero;
}

// Función para que el jugador humano juegue una carta
function jugarCarta(index) {
  if (currentPlayer !== 0) return; // Solo permite si es tu turno
  const carta = hands[0][index];
  const ultimaCarta = discardPile[discardPile.length - 1];
  if (isValidMove(carta, ultimaCarta)) {
    discardPile.push(carta);
    hands[0].splice(index, 1);
    renderHands();
    nextTurn();
  } else {
    alert("No puedes jugar esa carta");
  }
}

// Función para el turno de los jugadores de la PC
function turnoComputadora() {
  const hand = hands[currentPlayer];
  const ultimaCarta = discardPile[discardPile.length - 1];
  let jugadaRealizada = false;
  for (let i = 0; i < hand.length; i++) {
    if (isValidMove(hand[i], ultimaCarta)) {
      discardPile.push(hand[i]);
      hand.splice(i, 1);
      jugadaRealizada = true;
      break;
    }
  }
  if (!jugadaRealizada) {
    hand.push(deck.pop());
  }
  renderHands();
  nextTurn();
}

// Función para avanzar el turno
function nextTurn() {
  // Aquí se puede agregar lógica para comprobar si algún jugador ganó
  currentPlayer = (currentPlayer + 1) % 4;
  renderHands();
  // Si no es turno del humano, ejecutar la jugada de la PC con un retardo
  if (currentPlayer !== 0) {
    setTimeout(turnoComputadora, 1000);
  }
}

// Al cargar la ventana se inicializa el juego y se asigna el evento del botón "Robar Carta"
window.onload = function() {
  crearDeck();
  shuffle(deck);
  repartirCartas();
  renderHands();
  
  document.getElementById('draw-card').onclick = function() {
    if (currentPlayer !== 0) return;
    hands[0].push(deck.pop());
    renderHands();
  };
};