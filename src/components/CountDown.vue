<script setup lang="ts">
import { computed } from "vue";

interface Props {
  limit: number;
  elapsed: number;
}

const props = withDefaults(defineProps<Props>(), {
  limit: 20,
  elapsed: 0,
});

const padToTwo = (num: number): string => String(num).padStart(2, '0');
const timeLeft = computed<number>(() => props.limit - props.elapsed)
const timeLeftString = computed(() => {
  const seconds = timeLeft.value % 60;
  return `${padToTwo(seconds)}`;
})
const strokeDasharray = computed(() => {
  const radius = 45;
  const total = 2 * Math.PI * radius;
  const timeFraction = timeLeft.value / props.limit;
  const adjTimeFraction = timeFraction - (1 - timeFraction) / props.limit;
  const elapsedDash = Math.floor(adjTimeFraction * total);
  return `${elapsedDash} ${total}`;
})

</script>
<template>
  <div class="root relative w-24 h-24">
    <svg
      class="svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="circle">
        <circle class="time-elapsed-path" cx="50" cy="50" r="45" />
        <path
          class="time-left-path"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
          :style="{ strokeDasharray }"
        ></path>
      </g>
    </svg>
    <div class="time-left-container">
      <span class="time-left-label font-sans text-4xl text-indigo-800 font-extrabold">{{ timeLeftString }}</span>
    </div>
  </div>
</template>

<style>
/* Removes SVG styling that would hide the time label */
.circle {
  fill: none;
  stroke: none;
}

/* The SVG path that displays the timer's progress */
.time-elapsed-path {
  stroke-width: 7px;
  @apply stroke-gray-300;
}

.time-left-container {
  /* Size should be the same as that of parent container */
  height: inherit;
  width: inherit;

  /* Place container on top of circle ring */
  position: absolute;
  top: 0;

  /* Center content (label) vertically and horizontally  */
  display: flex;
  align-items: center;
  justify-content: center;
}

.time-left-path {
  /* Same thickness as the original ring */
  stroke-width: 7px;

  /* Rounds the path endings  */
  stroke-linecap: round;

  /* Makes sure the animation starts at the top of the circle */
  transform: rotate(90deg);
  transform-origin: center;

  /* One second aligns with the speed of the countdown timer */
  transition: 1s linear all;

  /* Colors the ring */
  /* stroke: blue;*/
  @apply stroke-indigo-800;
}

.svg {
  /* Flips the svg and makes the animation to move left-to-right */
  transform: scaleX(-1);
}
</style>