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
          <h1 class="text-indigo-700 font-bold text-2xl sm:text-4xl">🎉 Felicidades 🎉</h1>
          <p class="text-center text-lg text-gray-700">
            Has respondido {{ correctAnswers }} de {{ totalQuestions }} preguntas correctamente.
          </p>
        </div>
        <div class="flex flex-col justify-center items-center gap-2">
          <p class="text-center text-2xl sm:text-3xl text-gray-900 font-bold">
            Tu puntaje es {{ score }} puntos.
          </p>
          <p class="text-center text-sm text-gray-500">
            Revisa la sección de puntajes para ver si quedaste dentro de los 10 mejores.
          </p>
        </div>
        <div class="flex gap-3 items-center">
          <a href="/game" class="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm sm:text-base font-medium hover:bg-indigo-700">
            Volver a jugar!
          </a>
          <a href="/scores" class="px-5 py-2 rounded-lg bg-white border border-indigo-200 text-indigo-600 text-sm sm:text-base font-medium hover:bg-gray-100">
            Ver puntajes
          </a>
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