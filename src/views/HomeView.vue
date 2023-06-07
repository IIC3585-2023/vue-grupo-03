<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import CreateUserModalVue from "../components/CreateUserModal.vue";
import { useUserStore } from "@/stores/user";

const showModal = ref(false);
const userStore = useUserStore();

function playGame() {
  if (userStore.username) router.push("/game");
  else showModal.value = true;
}
</script>

<template>
  <main class="bg-indigo-50 h-full py-10 flex flex-col overflow-y-scroll">
    <section class="flex w-full justify-center items-center">
      <div class="max-w-lg flex flex-col gap-y-2 items-center justify-center"> 
        <img src="@/assets/brain.png" alt="brain-img"/>
        <h1 class="text-5xl text-indigo-800 font-extrabold">BrainBuster</h1>
        <p class="text-lg text-indigo-500">
          Challenge your brain with a series of questions.
        </p>
        
        <div class="flex gap-3 items-center mt-16">
          <button
            @click="playGame()"
            class="px-5 py-2 rounded-lg bg-indigo-600 text-white text-lg font-medium hover:bg-indigo-700"
          >
            Play
          </button>
          <router-link to="/scores" class="px-5 py-2 rounded-lg bg-white border border-indigo-200 text-indigo-600 text-lg font-medium hover:bg-gray-100">
            Scores
          </router-link>
        </div>
      </div>
    </section>
    <Teleport to="body">
      <CreateUserModalVue :show="showModal" @close="showModal = false"/>
    </Teleport>
  </main>
</template>
