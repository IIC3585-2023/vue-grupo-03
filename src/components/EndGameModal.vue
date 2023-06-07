<script setup lang="ts">
interface Props {
  show: boolean;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

defineProps<Props>();
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container px-5 py-8 sm:p-10 md:p-16 flex flex-col justify-between w-full md:w-2/5 h-3/5 items-center rounded-lg">
        <div class="flex flex-col justify-center items-center gap-2">
          <h1 class="text-indigo-700 font-bold text-2xl sm:text-4xl">🎉 Congratulations 🎉</h1>
          <p class="text-center text-lg text-gray-700">
            You have answered {{ correctAnswers }} out of {{ totalQuestions }} questions correctly.
          </p>
        </div>
        <div class="flex flex-col justify-center items-center gap-2">
          <p class="text-center text-2xl sm:text-3xl text-gray-900 font-bold">
            Your score is {{ score }} points.
          </p>
          <p class="text-center text-sm text-gray-500">
            Check the scores section to see if you are in the top 10.
          </p>
        </div>
        <div class="flex gap-3 items-center">
          <router-link to="/"  class="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm sm:text-base font-medium hover:bg-indigo-700">
            Home
          </router-link>
          <router-link to="/scores" class="px-5 py-2 rounded-lg bg-white border border-indigo-200 text-indigo-600 text-sm sm:text-base font-medium hover:bg-gray-100">
            Scores
          </router-link>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-container, .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>