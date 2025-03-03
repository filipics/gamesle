// Variables y funciones básicas para crear y barajar el mazo
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

// Variables para las manos y la pila de descartes
let playerHand = [];
let computerHand = [];
let discardPile = [];

// Repartir 7 cartas a cada uno y sacar la primera carta para iniciar el descarte
function repartirCartas() {
  for (let i = 0; i < 7; i++) {
    playerHand.push(deck.pop());
    computerHand.push(deck.pop());
  }
  discardPile.push(deck.pop());
}

// Actualizar la interfaz con las cartas actuales
function renderHands() {
  // Mostrar cartas del jugador
  const playerDiv = document.querySelector('#player-hand .cards');
  playerDiv.innerHTML = '';
  playerHand.forEach((carta, index) => {
    const cardElem = document.createElement('div');
    cardElem.className = 'card';
    cardElem.textContent = `${carta.color} ${carta.numero}`;
    cardElem.addEventListener('click', () => jugarCarta(index));
    playerDiv.appendChild(cardElem);
  });
  
  // Mostrar cartas de la PC como reverso
  const computerDiv = document.querySelector('#computer-hand .cards');
  computerDiv.innerHTML = '';
  computerHand.forEach(() => {
    const cardElem = document.createElement('div');
    cardElem.className = 'card';
    cardElem.textContent = '🂠';
    computerDiv.appendChild(cardElem);
  });
  
  // Mostrar la última carta en la pila de descartes
  const discardDiv = document.querySelector('#discard-pile .card');
  const ultimaCarta = discardPile[discardPile.length - 1];
  discardDiv.textContent = `${ultimaCarta.color} ${ultimaCarta.numero}`;
}

// Función para jugar una carta desde la mano del jugador
function jugarCarta(index) {
  const carta = playerHand[index];
  const ultimaCarta = discardPile[discardPile.length - 1];
  // Se permite jugar si la carta es comodín o coincide en color o número
  if (carta.color === 'comodin' || carta.color === ultimaCarta.color || carta.numero === ultimaCarta.numero) {
    discardPile.push(carta);
    playerHand.splice(index, 1);
    renderHands();
    setTimeout(turnoComputadora, 1000); // Turno de la PC
  } else {
    alert("No puedes jugar esa carta");
  }
}

// Lógica básica para el turno de la PC
function turnoComputadora() {
  const ultimaCarta = discardPile[discardPile.length - 1];
  let jugadaRealizada = false;
  for (let i = 0; i < computerHand.length; i++) {
    const carta = computerHand[i];
    if (carta.color === 'comodin' || carta.color === ultimaCarta.color || carta.numero === ultimaCarta.numero) {
      discardPile.push(carta);
      computerHand.splice(i, 1);
      jugadaRealizada = true;
      break;
    }
  }
  if (!jugadaRealizada) {
    computerHand.push(deck.pop());
  }
  renderHands();
}

// Al cargar la ventana se inicializa el juego y se asigna el evento del botón
window.onload = function() {
  crearDeck();
  shuffle(deck);
  repartirCartas();
  renderHands();

  // Asigna el evento una sola vez para evitar duplicados
  document.getElementById('draw-card').onclick = function() {
    playerHand.push(deck.pop());
    renderHands();
  };
};