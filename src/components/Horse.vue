<template>
  <div class="horse-container">
    <div class="horse-info">
      <span>{{ horse.name }}</span>
      <span class="condition">Condition: {{ horse.condition }}</span>
    </div>
    <div class="track">
      <div class="lane-marker"></div>
      <div
        class="horse"
        :style="{
          backgroundColor: horse.color,
          transform: `translateX(${currentPosition}px)`,
          transitionDuration: duration + 's'
        }"
      >
        {{ horse.name }}
      </div>
      <div class="finish-marker" :style="{ left: distance + 'px' }">
        <span class="distance-label">{{ distance }}px</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorseCard',
  props: {
    horse: { type: Object, required: true },
    distance: { type: Number, required: true },
    duration: { type: Number, required: true }
  },
  data() {
    return {
      currentPosition: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.currentPosition = this.distance;
      }, 50);
    });
  }
};
</script>