import axios from 'axios';

export const fetchNews = async () => {
  const response = await axios.get(
    `https://inshortsapi.vercel.app/news?category=science`,
  );
  return response.data.data;
};
