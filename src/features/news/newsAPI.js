import axios from 'axios';

export const fetchNewsApi = async () => {
  const response = await axios.get(
    `https://inshortsapi.vercel.app/news?category=technology`
  );
  console.log('response', response);
  return response.data.data;
};
