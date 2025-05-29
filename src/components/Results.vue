<template>
  <div class="results">
    <h3>Results</h3>
    <ul>
      <li v-for="entry in results" :key="entry.round">
        Round {{ entry.round }} Winner: {{ entry.winnerName }}
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useHorseStore } from '../store';

export default {
  name: 'RaceResults',
  setup() {
    const store = useHorseStore();
    const results = computed(() => store.results);
    return { results };
  }
};
</script>

<style scoped>
.results {
  margin-top: 20px;
}
.results ul {
  list-style: none;
  padding: 0;
}
.results li {
  margin: 5px 0;
}

</style>
