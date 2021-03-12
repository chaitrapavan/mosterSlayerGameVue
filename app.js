function randNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      count: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.count % 3 !== 0;
    },
  },
  watch: {
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "Draw";
      } else if (value <= 0) {
        this.winner = "Player";
      }
    },
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "Draw";
      } else if (value <= 0) {
        this.winner = "Monster";
      }
    },
  },
  methods: {
    attackMonster() {
      this.count++;
      const attackValue = randNum(12, 5);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.displayLog("Monster", "Attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = randNum(15, 8);
      this.playerHealth = this.playerHealth - attackValue;
      this.displayLog("Player", "Attack", attackValue);
    },
    specialAttackMonster() {
      this.count++;
      const attackValue = randNum(10, 25);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.displayLog("Monster", "Attack", attackValue);
      this.attackPlayer();
    },
    healPlyer() {
      this.count++;
      const healValue = randNum(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth = this.playerHealth + healValue;
      }
      this.displayLog("Player", "Heal", healValue);
      this.attackPlayer();
    },
    startNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.count = 0;
      this.winner = null;
      this.logMessage = [];
    },
    surrender() {
      this.winner = "Monster";
    },
    displayLog(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});
app.mount("#game");
