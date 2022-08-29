import axios from 'axios';

export const fetchSidebarApi = async () => {
  const response = await axios.get(
    `https://inshortsapi.vercel.app/news?category=startup`
  );
  return response.data.data;
};
