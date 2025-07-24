import axios from 'axios';

export const fetchSkeletonApi = async () => {
  const response = await axios.get(
    `https://fakestoreapi.com/products/category/electronics`
  );
  return response.data;
};
