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

const addScore = async (username: string, score: number): Promise<Score> => {
  const date = new Date()

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  const formattedDate = `${year}-${month}-${day}`;
  console.log('inside addScore', username, score);
  
  await firebase.post('/', { username, score, date: formattedDate });
  return { username, score, date: formattedDate };
};


export { getScores, addScore };