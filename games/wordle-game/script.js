/* ==================== Estilos Globales ==================== */
body {
    font-family: 'Arial', sans-serif;
    text-align: center;
    background-color: #121212;
    color: white;
    margin: 0;
    padding: 20px;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  
  /* ==================== Botones ==================== */
  .button {
    width: 150px;
    height: 50px;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    background-color: #222;
    color: white;
    margin: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
  }
  
  .button:hover {
    background-color: #444;
    transform: scale(1.05);
  }
  
  .button:active {
    background-color: #555;
    transform: scale(0.95);
  }
  
  /* ==================== Contenedor de Historial ==================== */
  #history {
    margin: 10px auto;
    max-width: 400px;
  }
  
  /* ==================== Tablero (Grid) ==================== */
  #grid {
    display: grid;
    gap: 10px;
    margin: 20px auto;
    justify-content: center;
    background-color: #1f1f1f;
    padding: 20px;
    border-radius: 10px;
    grid-template-columns: repeat(5, 1fr);
    max-width: 400px;
  }
  
  /* Cada celda tendrá un <span> para la letra */
  .cell {
    position: relative;
    background-color: #2c2c2c;
    border: 2px solid white;
    border-radius: 5px;
    width: 100%;
    height: 0;
    padding-top: 100%; /* Crea un cuadrado */
  }
  
  .cell span {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  /* ==================== Colores para aciertos ==================== */
  .correct {
    background-color: #4caf50 !important;
    color: white !important;
  }
  
  .present {
    background-color: #ffeb3b !important;
    color: black !important;
  }
  
  .absent {
    background-color: #965050 !important;
    color: white !important;
  }
  
  /* ==================== Teclado ==================== */
  #keyboard {
    width: 100%;
    max-width: 600px;
    margin: 20px auto 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1px;
    padding: 0;
  }
  
  .row {
    display: flex;
    flex-wrap: nowrap;
    gap: 1px;
    overflow-x: hidden;
    overflow-y: hidden;
    align-items: center;
    justify-content: center;
  }
  
  .key {
    flex: 1 1 0;
    height: 50px;
    line-height: 50px;
    background-color: #999;
    color: #fff;
    font-size: 1rem;
    text-transform: uppercase;
    text-align: center;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s, transform 0.2s;
    border-radius: 0;
  }
  
  /* Colores en las teclas según su estado */
  .key.correct {
    background-color: #4caf50 !important;
    color: white !important;
  }
  
  .key.present {
    background-color: #ffeb3b !important;
    color: black !important;
  }
  
  .key.absent {
    background-color: #965050 !important;
    color: white !important;
  }
  
  /* ==================== Responsividad ==================== */
  @media (max-width: 600px) {
    .button {
      width: 130px;
      height: 45px;
      font-size: 16px;
    }
    .cell span {
      font-size: 20px;
    }
    .key {
      font-size: 0.9rem;
    }
  }
  
