import { Component } from '@angular/core';

interface Player {
  id: string;
  name: string;
  health: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent {
  readonly MAX_HP = 150;
  readonly DAMAGE_VALUES = [10, 20, 40];
  players = {
    player_1: { id: 'player-1', name: 'Jugador 1', health: this.MAX_HP },
    player_2: { id: 'player-2', name: 'Jugador 2', health: this.MAX_HP },
  };
  currentTurn: 'player_1' | 'player_2' = 'player_1';
  attackMessage = '';

  getRandomDamage(): number {
    const randomIndex = Math.floor(Math.random() * this.DAMAGE_VALUES.length);
    return this.DAMAGE_VALUES[randomIndex];
  }

  classifyDamage(damage: number) {
    if (damage === 10) return { label: 'débil', css: 'weak' };
    if (damage === 20) return { label: 'normal', css: 'normal' };
    return { label: 'crítico', css: 'critical' };
  }

  attackPlayer(attackerKey: 'player_1' | 'player_2', defenderKey: 'player_1' | 'player_2') {
    const attacker = this.players[attackerKey];
    const defender = this.players[defenderKey];
    if (attacker.health <= 0 || defender.health <= 0) return;
    if (this.currentTurn !== attackerKey) return;
    const damage = this.getRandomDamage();
    defender.health = Math.max(0, defender.health - damage);
    const damageInfo = this.classifyDamage(damage);
    this.attackMessage = `<span class="${damageInfo.css}">${attacker.name} hizo un ataque ${damageInfo.label}, le quitó ${damage} de vida a ${defender.name}, vida de ${defender.name}: ${defender.health}</span>`;
    if (defender.health > 0) {
      this.currentTurn = this.currentTurn === 'player_1' ? 'player_2' : 'player_1';
    }
    if (defender.health <= 0) {
      this.endGame(attacker);
    }
  }

  endGame(winner: Player) {
    this.attackMessage = `<span class="critical">${winner.name} gana la partida!</span>`;
  }

  restartGame() {
    this.players.player_1.health = this.MAX_HP;
    this.players.player_2.health = this.MAX_HP;
    this.currentTurn = 'player_1';
    this.attackMessage = '';
  }
}

export const App = AppComponent;
