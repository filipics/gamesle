// Se asigna el listener a cada botón con la clase "game-btn".
// Solo se consideran aquellos botones que tengan un ID definido.
document.querySelectorAll('.game-btn').forEach((button) => {
  if (!button.id) return; // Salta botones sin ID

  button.addEventListener('click', () => {
    let gamePath;
    if (button.id === "game1") {
      gamePath = "/games/wordle-game/index.html";
    } else if (button.id === "game2") {
      gamePath = "/games/mundole-game/index.html";
    } else if (button.id === "game4") {
      gamePath = "/games/MathLe/index.html";
    } else {
      // Si se agregan más botones en el futuro con IDs diferentes.
      gamePath = `/games/game${button.id.replace('game', '')}/index.html`;
    }
    window.location.href = gamePath;
  });
});
