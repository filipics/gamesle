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

/* BARAJAR (