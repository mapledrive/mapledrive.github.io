import axios from 'axios';

export const fetchSidebarApi = async () => {
  const response = await axios.get(
    `https://inshortsapi.vercel.app/news?category=national`
  );
  return response.data.data;
};
