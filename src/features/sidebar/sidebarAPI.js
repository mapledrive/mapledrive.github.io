import axios from 'axios';

export const fetchSidebarApi = async () => {
  throw new Error('API request blocked intentionally');
  // The line below will never execute
  const response = await axios.get(
    `https://inshortsapi.vercel.app/news?category=national`
  );
  return response.data.data;
};
