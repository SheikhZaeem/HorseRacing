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
      return (entry.rawTime / minRaw.value) * 5;  // Increased to 5 seconds base
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