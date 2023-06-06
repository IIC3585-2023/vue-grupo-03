<script setup lang="ts">
import type { Score } from '../clients/firebase';

interface Props {
  scores?: Score[];
}

withDefaults(defineProps<Props>(), {
  scores: undefined,
});
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 w-96">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-center mx-auto font-bold leading-6 text-gray-900 text-3xl">Top 10 usuarios</h1>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-indigo-300">
            <thead>
              <tr>
                <th scope="col" class="py-3 pl-3.5 pr-3 text-center text-sm font-semibold text-gray-900">Username</th>
                <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Puntaje</th>
                <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Fecha</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-indigo-200">
              <tr v-for="score in scores" :key="score.username">
                <td class="whitespace-nowrap px-5 py-4 text-center text-sm font-medium text-gray-900">{{ score.username }}</td>
                <td class="whitespace-nowrap px-5 py-4 text-center text-sm text-gray-500">{{ score.score }}</td>
                <td class="whitespace-nowrap px-5 py-4 text-center text-sm text-gray-500">{{ score.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
  