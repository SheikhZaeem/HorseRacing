<template>
  <div class="race-round">
    <div class="round-header">
      <h3>Round {{ roundNumber }} – {{ round.distance }}m</h3>
      <div class="round-info">
        <span>Distance: {{ round.distance }}m</span>
        <span>Horses: {{ round.horses.length }}</span>
      </div>
    </div>
    
    <div class="horses-track">
      <HorseCard
        v-for="horse in roundHorses"
        :key="horse.id"
        :horse="horse"
        :distance="trackLength"
        :duration="getDurationFor(horse.id)"
      />
    </div>
  </div>
</template>
