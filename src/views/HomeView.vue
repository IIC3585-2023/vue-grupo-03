<script setup lang="ts">
import CreateUserModalVue from "../components/CreateUserModal.vue";
import { ref } from "vue";

const showModal = ref(false);
</script>

<template>
  <main class="bg-indigo-50 h-full py-10">
    <section class="flex w-full justify-center items-center">
      <div class="max-w-lg flex flex-col gap-y-2 items-center justify-center"> 
        <img src="@/assets/brain.png" alt="brain-img"/>
        <h1 class="text-5xl text-indigo-800 font-extrabold">BrainBuster</h1>
        <p class="text-lg text-indigo-500">
          Desafía tu mente y pon aprueba tu ingenio
        </p>
        
        <div class="flex gap-3 items-center mt-16">
          <button
            @click="showModal = true"
            class="px-5 py-2 rounded-lg bg-indigo-600 text-white text-lg font-medium hover:bg-indigo-700"
          >
            Jugar
          </button>
          <a href="/scores" class="px-5 py-2 rounded-lg bg-white border border-indigo-200 text-indigo-600 text-lg font-medium hover:bg-gray-100">
            Ver puntajes
          </a>
        </div>
      </div>
    </section>
    <Teleport to="body">
      <CreateUserModalVue :show="showModal" @close="showModal = false"/>
    </Teleport>
  </main>
</template>
