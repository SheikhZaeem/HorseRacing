<!-- 
  puts everything together
  eg:  buttons and controls for the game
  also shows race progress and results 
-->

<template>
  <div id="app">
    <div class="app-header">
      <h1>HORSE RACING GAME</h1>
      <p>Press Generate Horse & Schedule to start.</p>
    </div>

    <div class="controls">
      <button @click="generateGame">Generate Horses & Schedule</button>
      <button @click="startRace" :disabled="!scheduleGenerated || raceRunning">
        Start Race
      </button>
    </div>

    <div class="dashboard" v-if="scheduleGenerated">
      <!-- Left side Schedule -->
      <div class="schedule-container">
        <ScheduleTable :schedule="schedule" :allHorses="allHorses" />
      </div>
      
      <!-- Race Animation on right -->
       <div class="race-container">
          <RaceProgress 
            v-if="raceRunning"
            :currentRound="currentRound" 
            :totalRounds="schedule.length" 
            :progressPercentage="progressPercentage" 
           />
          <transition name="fade" mode="out-in">
            <RaceRound
                v-if="raceRunning && currentRound < schedule.length"
                :key="currentRound"
                :roundIndex="currentRound"
             />
                
                <div v-else class="waiting-message">
                <div class="icon">🏁</div>
                <h3>Ready to Race</h3>
                <p>Press "Start Race" to begin the competition</p>
                </div>
            </transition>
      </div>
    </div>

    <div class="results-container" v-if="scheduleGenerated">
      <ResultsTable :results="results" :schedule="schedule" :allHorses="allHorses" />
    </div>
  </div>
</template>
<script>
import { ref, computed } from 'vue';
import { useHorseStore } from './store';
import RaceRound from './components/RaceRound.vue';
import ScheduleTable from './components/ScheduleTable.vue';
import ResultsTable from './components/ResultsTable.vue';
import RaceProgress from './components/RaceProgress.vue';


export default {
  name: 'App',
  components: { 
    RaceRound,
    ScheduleTable,
    ResultsTable,
    RaceProgress
  },
  setup() {
    const store = useHorseStore();
    const scheduleGenerated = ref(false);
    const raceRunning = ref(false);
    const currentRound = ref(0);
    const progressPercentage = ref(0);

    const schedule = computed(() => store.schedule);
    const results = computed(() => store.results);
    const allHorses = computed(() => store.allHorses);

    function getHorseName(id) {
      const h = store.allHorses.find(x => x.id === id);
      return h ? h.name : '';
    }

    function generateGame() {
      progressPercentage.value = 0;
      store.generateHorses();
      store.generateSchedule();
      store.computeAllRoundTimesAndWinners();
      scheduleGenerated.value = true;
      currentRound.value = 0;
      raceRunning.value = false;
    }

    async function startRace() {
      raceRunning.value = true;
      progressPercentage.value = 0;

      for (let i = 0; i < schedule.value.length; i++) {
        currentRound.value = i;
        progressPercentage.value = Math.round(((i + 1) / schedule.value.length) * 100);

        const timesArr = store.roundTimes[i];
        if (!timesArr || timesArr.length === 0) continue;

        //maximum duration needed
        const minRaw = Math.min(...timesArr.map(e => e.rawTime));
        const maxRaw = Math.max(...timesArr.map(e => e.rawTime));
        const slowestDurationSec = (maxRaw / minRaw) * 5;
        
        //wait for slowest horse to finish
        await new Promise(res => 
          setTimeout(res, (slowestDurationSec + 1) * 1000)
        );
      }

    raceRunning.value = false;
    progressPercentage.value = 100;
    }

    return {
      scheduleGenerated,
      raceRunning,
      currentRound,
      progressPercentage,
      schedule,
      results,
      allHorses,
      generateGame,
      startRace,
      getHorseName
    };
  }
};
</script>

<style>

.dashboard {
  display: grid;
  grid-template-columns: 30% 70%; 
  gap: 25px;
  margin-bottom: 30px;
}

.schedule-container, .race-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.race-container {
  display: flex;
  flex-direction: column;
}

.waiting-message {
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
}

.waiting-message .icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.waiting-message h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #2c3e50;
}

.waiting-message p {
  font-size: 1.1rem;
}

.results-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

#app {
    background: #f5f5f5;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.controls {
  display: flex;
  gap: 15px;
  margin: 20px 0;
  justify-content: center;
}
.controls button {
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.controls button:first-child {
  background-color: #4CAF50; 
  color: white;
}

.controls button:last-child {
  background-color: #2196F3; 
  color: white;
}

.controls button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.controls button:active {
  transform: translateY(1px);
}
.controls button:disabled {
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.schedule ul,
.final-results ul {
  list-style: none;
  padding: 0;
}
.schedule li,
.final-results li {
  margin: 5px 0;
}
.race-progress {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-weight: bold;
}
.progress-bar {
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin-top: 8px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #4caf50, #8bc34a);
  transition: width 0.5s ease;
}
.app-header {
  text-align: center;
  padding: 20px 0;
  margin-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

@media (max-width: 1200px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1200px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
  
  .schedule-container {
    order: 2;
  }
  
  .race-container {
    order: 1;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>