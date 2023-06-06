<script setup lang="ts">
import { ref } from 'vue';
interface Props {
  show: boolean;
}

defineProps<Props>();

defineEmits<{(e: 'continue', value: void): void}>();

const username = ref('');

function saveUsername() {
  localStorage.setItem('username', username.value);
  window.location.href = '/game';
}

</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container space-y-4 px-5 sm:p-10 flex flex-col justify-between w-full md:w-1/3 h-1/3 items-center rounded-lg">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-indigo-600 mb-2">Ingresa tu nombre</h1>
          <p class="text-indigo-500">Para poder guardar tu puntaje</p>
        </div>
        <input 
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          class="text-indigo-600 border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          v-model="username"
        >
        <button 
          class="px-5 py-2 rounded-lg bg-indigo-600 text-white text-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600"
          @click="saveUsername"
          :disabled="!!username"
        >Continuar</button>
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