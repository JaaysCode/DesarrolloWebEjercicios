const MAX_HP = 150;
const DAMAGE_VALUES = [10, 20, 40];

const players = {
  player_1: { id: "player-1", name: "Jugador 1", health: MAX_HP },
  player_2: { id: "player-2", name: "Jugador 2", health: MAX_HP },
};

let currentTurn = "player_1";

function getRandomDamage() {
  const randomIndex = Math.floor(Math.random() * DAMAGE_VALUES.length);
  return DAMAGE_VALUES[randomIndex];
}

function classifyDamage(damage) {
  if (damage === 10) return { label: "débil", css: "weak" }; // minúsculas para el mensaje
  if (damage === 20) return { label: "normal", css: "normal" };
  return { label: "crítico", css: "critical" };
}

function updateUI() {
  updatePlayerUI(players.player_1);
  updatePlayerUI(players.player_2);
}

function updatePlayerUI(player) {
  const healthText = document.getElementById(`${player.id}-health`);
  if (healthText) {
    healthText.textContent = `Vida: ${player.health}`;
  }
}

function attackPlayer(attacker, defender) {
  if (attacker.health <= 0 || defender.health <= 0) return;

  if (
    (attacker === players.player_1 && currentTurn !== "player_1") ||
    (attacker === players.player_2 && currentTurn !== "player_2")
  ) {
    return;
  }

  const damage = getRandomDamage();
  defender.health = Math.max(0, defender.health - damage);
  const damageInfo = classifyDamage(damage);
  updateUI();
  showAttackResult(attacker, defender, damage, damageInfo);

  if (defender.health > 0) {
    currentTurn = currentTurn === "player_1" ? "player_2" : "player_1";
    updateTurnIndicators();
  }

  if (defender.health <= 0) {
    endGame(attacker, defender);
  }
}

function showAttackResult(attacker, defender, damage, damageInfo) {
  const box = document.getElementById("attack-message");
  if (!box) return;
  box.innerHTML = `<span class="${damageInfo.css}">${attacker.name} hizo un ataque ${damageInfo.label}, le quitó ${damage} de vida a ${defender.name}, vida de ${defender.name}: ${defender.health}</span>`;
}

function endGame(winner) {
  disableAttackButtons();
  const box = document.getElementById("attack-message");
  if (box)
    box.innerHTML = `<span class="critical">${winner.name} gana la partida!</span>`;
}

function disableAttackButtons() {
  const b1 = document.getElementById("player-1-attack-button");
  const b2 = document.getElementById("player-2-attack-button");
  if (b1) b1.disabled = true;
  if (b2) b2.disabled = true;
}

function enableAttackButtons() {
  const b1 = document.getElementById("player-1-attack-button");
  const b2 = document.getElementById("player-2-attack-button");
  if (b1) b1.disabled = false;
  if (b2) b2.disabled = false;
}

function restartGame() {
  players.player_1.health = MAX_HP;
  players.player_2.health = MAX_HP;
  updateUI();
  enableAttackButtons();
  currentTurn = "player_1";
  const box = document.getElementById("attack-message");
  if (box) box.textContent = "";
  updateTurnIndicators();
}

function initGame() {
  updateUI();
  const btn1 = document.getElementById("player-1-attack-button");
  const btn2 = document.getElementById("player-2-attack-button");

  if (btn1) {
    btn1.addEventListener("click", () =>
      attackPlayer(players.player_1, players.player_2)
    );
  }
  if (btn2) {
    btn2.addEventListener("click", () =>
      attackPlayer(players.player_2, players.player_1)
    );
  }

  const btnRestart = document.getElementById("btn-restart");
  if (btnRestart) {
    btnRestart.addEventListener("click", restartGame);
  }
  updateTurnIndicators();
}

function updateTurnIndicators() {
  const b1 = document.getElementById("player-1-attack-button");
  const b2 = document.getElementById("player-2-attack-button");
  if (!b1 || !b2) return;

  if (players.player_1.health > 0 && players.player_2.health > 0) {
    b1.disabled = currentTurn !== "player_1";
    b2.disabled = currentTurn !== "player_2";
  }
}

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", initGame);
