const cells = document.querySelectorAll(".cell");
const playerTurnText = document.getElementById("player-turn");
const resetBtn = document.getElementById("reset-btn");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameRunning = false;

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  resetBtn.addEventListener("click", restartGame);
  playerTurnText.textContent = `${currentPlayer}'s turn`;
  gameRunning = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("data-index");

  if (options[cellIndex] !== "" || !gameRunning) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.classList.add("pop");
  setTimeout(() => cell.classList.remove("pop"), 300);
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  playerTurnText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    playerTurnText.textContent = `${currentPlayer} wins!`;
    gameRunning = false;
    playerTurnText.style.color = currentPlayer === "X" ? "#3498db" : "#e74c3c";
    return;
  }

  if (!options.includes("")) {
    playerTurnText.textContent = `Draw!`;
    gameRunning = false;
    playerTurnText.style.color = "#2c3e50";
    return;
  }

  changePlayer();
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  playerTurnText.textContent = `${currentPlayer}'s turn`;
  playerTurnText.style.color = "#333";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
  gameRunning = true;
}

initializeGame();
