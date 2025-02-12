// Lógica para el botón de estadísticas
document.getElementById('statsButton').addEventListener('click', () => {
  alert('Mostrando estadísticas...');
});

// Lógica para redirigir al juego Wordle
document.getElementById('game1').addEventListener('click', () => {
  window.location.href = '/games/wordle-game/index.html'; // Cambiado a /games
});  
document.getElementById('game2').addEventListener('click', () => {
  window.location.href = '/games/mundole-game/index.html'; // Cambiado a /games
});
// Aquí puedes agregar más lógica para otros juegos de la misma manera
// Ejemplo para el Juego 2:
document.querySelectorAll('.game-btn').forEach((button) => {
  if (!button.id) return; // Evita botones sin ID

  button.addEventListener('click', () => {
    let gamePath = button.id === "game1" ? "/games/wordle-game/index.html" :
                   button.id === "game2" ? "/games/mundole-game/index.html" :
                   `/games/game${button.id.replace('game', '')}/index.html`;

    window.location.href = gamePath;
  });
});
