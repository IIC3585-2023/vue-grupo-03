import axios from 'axios'

export interface ImageAnswer {
  url: string, 
  height: number, 
  width: number, 
  description: string,
}

export interface Question {
  category: string,
  id: string,
  tags: string[],
  difficulty: "easy" | "medium" | "hard",
  regions: string[],
  isNiche: boolean,
  question: { text: string, image?: string },
  correctAnswer: ImageAnswer | string,
  incorrectAnswers: ImageAnswer[] | string[],
  type: string,
}

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

export default {
  getQuestions() {
    return api({
      method: 'GET',
      url: 'https://the-trivia-api.com/v2/questions',
    });
  }
}