<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query"
import ScoreTable from "../components/ScoreTable.vue";
import { getScores, type Score } from '../clients/firebase';
import IconLoading from "../components/icons/IconLoading.vue"

const { isLoading, isSuccess, data } = useQuery<Score[], Error>({
  queryKey: ["scores"],
  queryFn: getScores,
})
</script>

<template>
  <main class="flex flex-col bg-indigo-50 h-full py-10 overflow-y-scroll">
    <div class="flex items-center h-32 w-full pb-3">
      <img class="mx-auto h-full" src="@/assets/brain.png" alt="brain-img"/>
    </div>
    <div v-if="isLoading" class="w-full flex py-10 justify-center">
      <span class="animate-spin w-10 h-10 block pointer-events-none text-gray-500">
        <IconLoading />
      </span>
    </div>
    <div v-if="isSuccess">
      <section class="flex w-full justify-center items-center">
        <ScoreTable :scores="data" />
      </section>
    </div>
    <div class="flex gap-3 items-center mt-4">
      <router-link to="/" class="mx-auto px-5 py-2 rounded-lg bg-white border border-indigo-200 text-indigo-600 text-lg font-medium hover:bg-gray-100">
        Back
      </router-link>
    </div>
  </main>
</template>