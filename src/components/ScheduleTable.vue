<!-- 
  displays horse names and colors and conditions
  in a table format
-->
<template>
  <div class="schedule-table">
    <h2>RACE SCHEDULE</h2>
    
    <table>
      <thead>
        <tr>
          <th>Round</th>
          <th>Horses (Condition)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(round, idx) in schedule" :key="idx">
          <td class="round-info">
            <div class="round-number">#{{ idx + 1 }}</div>
            <div class="distance">{{ round.distance }}m</div>
          </td>
          <td>
            <div class="horse-entries">
              <div v-for="id in round.horses" :key="id" class="horse-entry">
                <div class="color-indicator" :style="{ backgroundColor: getHorseColor(id) }"></div>
                <div class="horse-info">
                  <span class="horse-name">{{ getHorseName(id) }}</span>
                  <span class="horse-condition">{{ getHorseCondition(id) }}</span>
                </div>
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
  name: 'ScheduleTable',
  props: {
    schedule: Array,
    allHorses: Array
  },
  methods: {
    getHorseName(id) {
      const horse = this.allHorses.find(h => h.id === id);
      return horse ? horse.name : 'Unknown';
    },
    getHorseColor(id) {
      const horse = this.allHorses.find(h => h.id === id);
      return horse ? horse.color : '#ccc';
    },
    getHorseCondition(id) {
      const horse = this.allHorses.find(h => h.id === id);
      return horse ? horse.condition : 0;
    }
  }
}
</script>

<style scoped>
.schedule-table {
  overflow-x: auto;
  font-size: 0.9em;
  background: #e8f4f8; 
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white; 
}

th, td {
  padding: 8px 10px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

.round-info {
  min-width: 60px;
  vertical-align: top;
  padding-top: 12px;
}

.round-number {
  font-weight: bold;
  font-size: 1.1em;
  color: #3498db;
}

.distance {
  font-size: 0.85em;
  color: #7f8c8d;
  margin-top: 3px;
}

.horse-entries {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
}

.horse-entry {
  display: flex;
  align-items: center;
  min-height: 24px;
}

.color-indicator {
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
  border: 1px solid #ddd;
}

.horse-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
}

.horse-name {
  font-size: 0.85em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70px;
}

.horse-condition {
  font-size: 0.8em;
  font-weight: 600;
  color: #2c3e50;
  background: #f0f4f8;
  border-radius: 3px;
  padding: 0 4px;
  min-width: 24px;
  text-align: center;
}
</style>