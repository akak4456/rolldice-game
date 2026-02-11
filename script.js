let turn = "player1";
let player1CurrentScore = 0;
let player2CurrentScore = 0;
let player1SumScore = 0;
let player2SumScore = 0;

const updateGameState = () => {
  const player1 = document.querySelector("#player1");
  const player2 = document.querySelector("#player2");
  const player1CurrentScoreP = document.querySelector(
    "#current-score--player1",
  );
  const player2CurrentScoreP = document.querySelector(
    "#current-score--player2",
  );
  const player1SumScoreP = document.querySelector("#score--player1");
  const player2SumScoreP = document.querySelector("#score--player2");
  player1CurrentScoreP.innerText = player1CurrentScore;
  player2CurrentScoreP.innerText = player2CurrentScore;
  player1SumScoreP.innerText = player1SumScore;
  player2SumScoreP.innerText = player2SumScore;
  if (turn === "player1") {
    player1.classList.add("player--active");
    player2.classList.remove("player--active");
  } else {
    player1.classList.remove("player--active");
    player2.classList.add("player--active");
  }
};
const checkGameFinish = () => {
  if (turn === "player1" && player1SumScore > 50) {
    return true;
  } else if (turn === "player2" && player2SumScore > 50) {
    return true;
  }
  return false;
};
const addSumScore = () => {
  if (turn === "player1") {
    player1SumScore += player1CurrentScore;
    player1CurrentScore = 0;
  } else {
    player2SumScore += player2CurrentScore;
    player2CurrentScore = 0;
  }
};
const addCurrentScore = (addedScore) => {
  if (turn === "player1") {
    player1CurrentScore += addedScore;
  } else {
    player2CurrentScore += addedScore;
  }
};
const resetCurrentScore = () => {
  if (turn === "player1") {
    player1CurrentScore = 0;
  } else {
    player2CurrentScore = 0;
  }
};
const changeTurn = () => {
  if (turn === "player1") {
    turn = "player2";
  } else {
    turn = "player1";
  }
};

const holdScore = () => {
  addSumScore();
  if (checkGameFinish()) {
    updateGameState();
    gameFinish();
  } else {
    changeTurn();
    updateGameState();
  }
};

const rollDice = () => {
  const diceNum = Math.floor(Math.random() * 6) + 1;
  const dice = document.querySelector(".dice");
  dice.classList.remove("hidden");
  dice.src = `assets/dice-${diceNum}.png`;
  if (diceNum <= 2) {
    resetCurrentScore();
    changeTurn();
  } else {
    addCurrentScore(diceNum);
  }
  updateGameState();
};

const gameFinish = () => {
  document.querySelector(".game-finish").classList.remove("hidden");
  document
    .querySelector(".btn--rolldice")
    .removeEventListener("click", rollDice);
  document.querySelector(".btn--hold").removeEventListener("click", holdScore);
};

const gameStart = () => {
  turn = "player1";
  player1CurrentScore = 0;
  player2CurrentScore = 0;
  player1SumScore = 0;
  player2SumScore = 0;
  document.querySelector(".game-finish").classList.add("hidden");
  document.querySelector(".btn--rolldice").addEventListener("click", rollDice);
  document.querySelector(".btn--hold").addEventListener("click", holdScore);
  updateGameState();
};
document.querySelector(".btn--newgame").addEventListener("click", gameStart);
gameStart();
