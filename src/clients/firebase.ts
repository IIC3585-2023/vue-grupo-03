import axios from 'axios';

export interface Score {
  username: string
  score: number
  date: string
};

const firebase = axios.create({
  baseURL: 'https://pwa-db-t4-default-rtdb.firebaseio.com/scores.json',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const getScores = async (): Promise<Score[]> => {
  const response = await firebase.get('/');
  const data: Score[] = response.data;

  const scores = Object.values(data).sort((a: Score, b: Score) => b.score - a.score).slice(0, 10);

  return scores;
};

const addScore = (username: string, score: number) => {
  const date = new Date().toISOString();

  firebase.post('/', { username, score, date });

  return { username, score, date };
};


export { getScores, addScore };