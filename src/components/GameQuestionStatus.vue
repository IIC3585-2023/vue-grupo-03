<script setup lang="ts">
interface Props {
  currentQuestionIndex: number;
}

const props = defineProps<Props>();

const numberAllQuestions = 10;

function checkQuestionPassed(index: number) {
  return index <= props.currentQuestionIndex;
}

</script>
<template>
  <div class="flex mx-auto">
    <div
      v-for="index in numberAllQuestions"
      :key="index"
      class="mb-4 flex items-center lg:mb-6"
    >
      <div
        class="w-8 h-8 rounded-full border-2 border-indigo-600 m-1 flex items-center justify-center"
        :class="{
          'bg-indigo-600': checkQuestionPassed(index),
          'bg-white': !checkQuestionPassed(index),
        }"
      >
        <span
          class="text-s font-semibold"
          :class="{
            'text-white': checkQuestionPassed(index),
            'text-indigo-600': !checkQuestionPassed(index),
          }"
        >
          {{ index }}
        </span>
      </div>
      <div
        v-if = "index < numberAllQuestions"
        class="w-4 h-1 rounded-full"
        :class="{
          'bg-indigo-600': checkQuestionPassed(index),
          'bg-gray-300': !checkQuestionPassed(index),
        }"
      ></div>
    </div>
  </div>
</template>
