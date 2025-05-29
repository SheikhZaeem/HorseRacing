<!-- 
  a simple progress bar showing race completions
-->
<template>
  <div class="race-progress">
    <div class="progress-info">
      <span>Round {{ currentRound + 1 }} of {{ totalRounds }}</span>
      <span>{{ progressPercentage }}% Complete</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RaceProgress',
  props: {
    currentRound: Number,
    totalRounds: Number,
    progressPercentage: Number
  }
}
</script>

<!-- style for race progress bar -->
<style scoped>
.race-progress {
  margin-bottom: 25px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: 500;
}

.progress-bar {
  height: 12px;
  background: #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #3498db, #2ecc71);
  transition: width 0.5s ease;
}
</style>