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