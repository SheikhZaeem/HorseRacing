<template>
  <div id="app">
    <div class="app-header">
      <h1>INSIDER HORSE RACING</h1>
      <p>Professional horse racing simulation</p>
    </div>

    <div class="controls">
      <button @click="generateGame">Generate Horses & Schedule</button>
      <button @click="startRace" :disabled="!scheduleGenerated || raceRunning">
        Start Race
      </button>
    </div>

    <div class="dashboard" v-if="scheduleGenerated">
      <!-- Left: Schedule -->
      <div class="schedule-container">
        <ScheduleTable :schedule="schedule" :allHorses="allHorses" />
      </div>
      
      <!-- Right: Race Animation -->
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

        // Calculate maximum duration needed
        const minRaw = Math.min(...timesArr.map(e => e.rawTime));
        const maxRaw = Math.max(...timesArr.map(e => e.rawTime));
        const slowestDurationSec = (maxRaw / minRaw) * 5;  // Increased to 5 seconds base
        
        // Wait for slowest horse to finish
        await new Promise(res => 
          setTimeout(res, (slowestDurationSec + 1) * 1000)  // Added 1 second buffer
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