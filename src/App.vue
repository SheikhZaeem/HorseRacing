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