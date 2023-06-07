<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue"
import { useQuery, useMutation } from "@tanstack/vue-query"
import triviaApi, { type Question as QuestionType } from ".././clients/trivia"
import { addScore } from ".././clients/firebase"
import Question from "../components/Question.vue"
import IconLoading from "../components/icons/IconLoading.vue"
import GameQuestionStatus from "../components/GameQuestionStatus.vue"
import GameScore from "../components/GameScore.vue"
import EndGameModal from "@/components/EndGameModal.vue"
import CountDown from "@/components/CountDown.vue"
import { useUserStore } from '@/stores/user';

async function getQuestions() {
  const response = await triviaApi.getQuestions();
  return response.data;
}

const userStore = useUserStore();

const { 
  isLoading: isLoadingQuestions,
  isSuccess: isSuccessQuestions,
  data,
  } = useQuery<QuestionType[], Error>({
  queryKey: ['questions'],
  queryFn: getQuestions,
  refetchOnMount: 'always',
})

const currentQuestion = ref<QuestionType | undefined>(data.value?.[0]);
  const totalQuestions = ref<number>(data.value?.length as number);

watch(isSuccessQuestions, (newValue) => {
  if (newValue) {
    currentQuestion.value = data.value?.[0];
    totalQuestions.value = data.value?.length as number;
  }
})

const {
  mutate: mutateAddScore,
} = useMutation({
  mutationFn: (data: {score: number, username: string}) => addScore(data.username, data.score),
})

const currentQuestionIndex = ref<number>(1);
const showModal = ref<boolean>(false);
const currentScore = ref<number>(0);
const correctAnswers = ref<number>(0);

const timeLimitDefault: number = 20;
const timeElapsed = ref<number>(0);
const timerInterval = ref<number|undefined>(undefined);
const timeLimit = ref<number>(timeLimitDefault);

const nextQuestion = (isCorrect: boolean) => {
  if (isCorrect) {
    currentScore.value += 1000 * ((timeLimit.value - timeElapsed.value)/timeLimit.value);
    correctAnswers.value++;
  }
  currentQuestion.value = data.value?.[currentQuestionIndex.value];
  currentQuestionIndex.value++;
  if (data.value?.length as number === currentQuestionIndex.value - 1) {
    mutateAddScore({ score: currentScore.value, username: userStore.username });
    showModal.value = true;
    clearInterval(timerInterval.value);
  }
  else {
    clearInterval(timerInterval.value);
    restartTimer();
  }
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
  <div class="bg-indigo-50 h-full py-10 px-10 flex justify-center">
    <div class="flex flex-col align-middle items-center max-w-2xl gap-y-3">
      <GameQuestionStatus :currentQuestionIndex="currentQuestionIndex" :totalQuestions="totalQuestions" />
      <div v-if="isLoadingQuestions" class="w-full flex py-10 justify-center">
        <span class="animate-spin w-10 h-10 block pointer-events-none text-gray-500">
          <IconLoading />
        </span>
      </div>
      <div v-if="isSuccessQuestions" class="flex flex-col align-middle w-full sm:w-[32rem] items-center gap-y-3">
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