<script setup lang="ts">
import type { Question, ImageAnswer } from '../clients/trivia';
import _ from 'lodash';
import { ref, computed } from "vue";
import ConfettiExplosion from "vue-confetti-explosion";

interface Props {
  question?: Question;
}

const props = withDefaults(defineProps<Props>(), {
  question: undefined,
});

const emit = defineEmits<{(e:'answerUser', value: boolean): void}>();
const selectedAnswer = ref<ImageAnswer | string | undefined>(undefined);
const isCorrect = computed(() => props.question?.correctAnswer === selectedAnswer.value);
const shuffleAlternatives = computed(() => _.shuffle([...props.question?.incorrectAnswers || [], props.question?.correctAnswer]));

const indexToLetter: { [key: number]: string } = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
}
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const onClick = async (answer: ImageAnswer | string) => {
  selectedAnswer.value = answer;  
  await delay(800);
  emit('answerUser', isCorrect.value);
  selectedAnswer.value = undefined;
}
</script>

<template>
  <section v-if="!!question" class="flex flex-col gap-y-10 rounded-lg shadow-lg bg-indigo-900 items-center justify-center px-10 py-10">
    <h1 class="text-white text-lg text-center font-medium">
      {{ question.question.text }}
    </h1>
    <div class="grid grid-cols-1 gap-4 w-full">
      <div v-for="(answer, index) in shuffleAlternatives" :key="index" >
        <button
          @click="onClick(answer)"
          class="flex gap-2 w-full items-center justify-start p-2 pr-5 text-white rounded-lg shadow col-span-1 text-base"
          :class="{
            'bg-indigo-700 hover:bg-indigo-600': !selectedAnswer || (selectedAnswer !== answer),
            'bg-green-600 hover:bg-green-600': selectedAnswer === answer && isCorrect,
            'bg-red-600 hover:bg-red-600': selectedAnswer === answer && !isCorrect,
          }"
        >
          <span class="rounded-lg bg-indigo-300 text-indigo-700 font-medium py-1 px-2.5 text-base h-full">
            {{ indexToLetter[index] }}
          </span>
          {{ answer?.description || answer }}
          <ConfettiExplosion :force="0.8" :duration="5000" v-if="selectedAnswer === answer && isCorrect" />
        </button>
      </div>
    </div>
    <p class="text-white">
      {{  question.correctAnswer }}
    </p>
  </section>
</template>