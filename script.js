document.getElementById('statsButton').addEventListener('click', () => {
  alert('Mostrando estadísticas...');
});

// Lógica para redirigir a un juego (ejemplo para el juego 1)
document.querySelectorAll('.game-btn').forEach((button, index) => {
  button.addEventListener('click', () => {
    // Aquí se redirige a la página correspondiente de cada juego
    window.location.href = `/games/game${index + 1}/index.html`; // Asegúrate de tener los archivos correspondientes para cada juego
  });
});
