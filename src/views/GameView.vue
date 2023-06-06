<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue"
import { useQuery } from "@tanstack/vue-query"
import triviaApi, { type Question as QuestionType } from ".././clients/trivia"
import Question from "../components/Question.vue"
import IconLoading from "../components/icons/IconLoading.vue"
import GameQuestionStatus from "../components/GameQuestionStatus.vue"
import GameScore from "../components/GameScore.vue"
import EndGameModal from "@/components/EndGameModal.vue"
import CountDown from "@/components/CountDown.vue"

async function getQuestions(): Promise<QuestionType[]> {
  const response = await triviaApi.getQuestions();
  currentQuestion.value = data.value?.[0];
  return response.data;
}

const { isLoading, isSuccess, data } = useQuery<QuestionType[], Error>({
  queryKey: ["questions"],
  queryFn: getQuestions,
})

const currentQuestion = ref<QuestionType | undefined>(data.value?.[0]);
const currentQuestionIndex = ref<number>(0);
const showModal = ref<boolean>(false);
const correctAnswers = ref<number>(0);
const currentScore = computed(() => correctAnswers.value * 1000);

const timeLimitDefault: number = 20;
const timeElapsed = ref<number>(0);
const timerInterval = ref<number|undefined>(undefined);
const timeLimit = ref<number>(timeLimitDefault);

const nextQuestion = (isCorrect: boolean) => {
  if (isCorrect) correctAnswers.value += 1;
  currentQuestion.value = data.value?.[currentQuestionIndex.value];
  currentQuestionIndex.value++;
  if (data.value?.length as number === currentQuestionIndex.value) {
    showModal.value = true;
    clearInterval(timerInterval.value);
  }
  else restartTimer();
}

const restartTimer = async () => {
  timeElapsed.value = 0;
  timerInterval.value = undefined;
  timeLimit.value = timeLimitDefault;
  await nextTick();
  startTimer();
}

const startTimer = () => {
  timerInterval.value = setInterval(() => {
    if (++timeElapsed.value === timeLimit.value) {
      clearInterval(timerInterval.value);
      nextQuestion(false);
    }
  }, 1000);
}

onMounted(() => {
  startTimer();
});
</script>

<template>
  <div class="bg-indigo-50 h-full py-10 flex justify-center">
    <div class="flex flex-col align-middle items-center max-w-2xl gap-y-3">
      <GameQuestionStatus :currentQuestionIndex="currentQuestionIndex" />
      <div v-if="isLoading">
        <span class="animate-spin w-4 h-4 block pointer-events-none text-gray-500">
          <IconLoading />
        </span>
      </div>
      <div v-if="isSuccess" class="flex flex-col align-middle items-center gap-y-3">
        <CountDown :elapsed="timeElapsed" :limit="timeLimit" />
        <Question
          :question="currentQuestion"
          @answerUser="nextQuestion"
        />
      </div>
      <GameScore :score="currentScore" />
    </div>
  </div>
  <EndGameModal
    :show="showModal"
    :score="currentScore"
    :correctAnswers="correctAnswers"
    :totalQuestions="data?.length || 0"
  />
</template>