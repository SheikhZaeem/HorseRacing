<!-- 
  shows top 3 horses for every each round
-->

<template>
  <div class="results-table">
    <table>
      <thead>
        <tr>
          <th>Round</th>
          <th>Distance</th>
          <th>Winner</th>
          <th>Condition</th>
          <th>Top 3 Horses</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(result, idx) in results" :key="result.round">
          <td class="round-number">#{{ result.round }}</td>
          <td class="distance">{{ getRoundDistance(idx) }}m</td>

          <td>
            <div class="winner-info">
              <div class="color-indicator" :style="{ backgroundColor: getHorseColor(result.winnerName) }"></div>
              <span class="winner-name">{{ result.winnerName }}</span>
            </div>
          </td>
          <td class="winner-condition">{{ getHorseCondition(result.winnerName) }}</td>

          <td>
            <div class="podium">
              <div v-for="(horse, pIdx) in result.top3" :key="horse.id" 
                   :class="['podium-step', `pos-${pIdx+1}`]">
                <div class="position">#{{ pIdx+1 }}</div>
                <div class="horse-name">{{ horse.name }}</div>
                <div class="horse-condition">{{ horse.condition }}</div>
              </div>
            </div>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'ResultsTable',
  props: {
    results: Array,
    schedule: Array,
    allHorses: Array
  },
  methods: {
    getRoundDistance(roundIndex) {
      return this.schedule[roundIndex]?.distance || 'N/A';
    },
    getHorseColor(horseName) {
      const horse = this.allHorses.find(h => h.name === horseName);
      return horse ? horse.color : '#ccc';
    },
    getHorseCondition(horseName) {
      const horse = this.allHorses.find(h => h.name === horseName);
      return horse ? horse.condition : 0;
    }
  }
}
</script>

<style scoped>
.results-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

.round-number {
  font-weight: bold;
  font-size: 1.2em;
  color: #3498db;
}
.distance {
  font-weight: bold;
  color: #e74c3c;
}
.winner-info {
  display: flex;
  align-items: center;
}

.color-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid #ddd;
}
.winner-name {
  font-weight: 600;
  color: #2c3e50;
}
.winner-condition {
  font-weight: bold;
  color: #27ae60;
  font-size: 1.1em;
}

.podium {
  display: flex;
  gap: 8px;
}

.podium-step {
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  text-align: center;
}
.pos-1 {
  background: linear-gradient(to bottom, #f1c40f, #f39c12);
  order: 2;
}

.pos-2 {
  background: linear-gradient(to bottom, #bdc3c7, #95a5a6);
  order: 1;
}

.pos-3 {
  background: linear-gradient(to bottom, #e67e22, #d35400);
  order: 3;
}
.position {
  font-weight: bold;
  font-size: 0.9em;
  margin-bottom: 5px;
}
.horse-name {
  font-weight: 500;
  margin-bottom: 3px;
}
.horse-condition {
  font-size: 0.9em;
  color: #2c3e50;
  font-weight: bold;
}
</style>