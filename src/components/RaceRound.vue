<!-- 
  showing 1 round of race with all horses
  each horse moves along  track and also
  getting data from the store 
-->

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

<script>
import { computed } from 'vue';
import { useHorseStore } from '../store';
import HorseCard from './Horse.vue';

export default {
  name: 'RaceRound',
  components: { HorseCard },
  props: {
    roundIndex: { type: Number, required: true }
  },

  setup(props) {

    const store = useHorseStore();
    const round = computed(() => store.schedule[props.roundIndex]);
    const roundNumber = computed(() => props.roundIndex + 1);

    const roundHorses = computed(() =>
      round.value.horses.map(id => store.allHorses.find(h => h.id === id))
    );

    //compute track length
    const maxDistancePx = 800;
    const maxMeters = 2200;
    const trackLength = computed(() =>
      Math.round((round.value.distance / maxMeters) * maxDistancePx)
    );

    const rawTimes = computed(() => store.roundTimes[props.roundIndex] || []);

    // finidng  minimum time (fastest horse)
    const minRaw = computed(() => {
      if (!rawTimes.value.length) return 1;
      return Math.min(...rawTimes.value.map(rt => rt.rawTime));
    });

    function getDurationFor(horseId) {
      const entry = rawTimes.value.find(rt => rt.id === horseId);
      if (!entry) return 5;
      return (entry.rawTime / minRaw.value) * 5; 
    }

    return {
      round,
      roundNumber,
      roundHorses,
      trackLength,
      getDurationFor
    };
  }
};

</script>

<style scoped>
.race-round {
  margin-bottom: 32px;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.round-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}
.round-info {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #666;
}
.horses-track {
  background: #d4e6f1;
  border: 2px solid #5d9cec;
  border-radius: 8px;
  padding: 16px;
}
</style>
