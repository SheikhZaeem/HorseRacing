<!-- 
  displayss a horse moving on track
-->
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

<!-- style for the horse component -->
<style scoped>
.horse-container {
  margin: 12px 0;
  padding: 8px;
  border-bottom: 1px dashed #e0e0e0;
}

.horse-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}

.condition {
  color: #666;
  font-weight: bold;
}

.track {
  position: relative;
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
}

.lane-marker {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-image: repeating-linear-gradient(
    to right,
    transparent,
    transparent 19px,
    #e0e0e0 20px
  );
}

.horse {
  position: absolute;
  width: 80px;
  height: 40px;
  line-height: 40px;
  color: white;
  text-align: center;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  transform: translateX(0);
  transition-property: transform;
  transition-timing-function: linear;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.finish-marker {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: #e74c3c;
  z-index: 1;
}

.distance-label {
  position: absolute;
  top: -20px;
  right: 5px;
  font-size: 10px;
  color: #e74c3c;
  font-weight: bold;
  white-space: nowrap;
}
</style>