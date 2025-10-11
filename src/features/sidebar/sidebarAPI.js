import axios from 'axios';

export const fetchSidebarApi = async () => {
  if (false) {
    const response = await axios.get(
      `https://inshortsapi.vercel.app/news?category=national`
    );
    return response.data.data;
  }
  throw new Error('API request blocked intentionally');
};
