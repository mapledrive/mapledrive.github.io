import axios from 'axios';

export const fetchGithubApi = async () => {
  const response = await axios.get(
    `https://api.github.com/search/repositories?q=Eiad`
  );
  console.log(response, 'response');
  return response.data;
};

// export const fetchGithubApi = async payload => {
//   console.log(payload, 'payload');
//   let { page: pageIndex, ...rest } = payload || {};
//   const qs = stringifyQuery({ pageIndex, ...rest });
//   response = await axios.get(`https://api.github.com/search/code?${qs}`);
//   return response.data;
// };

//  https://api.github.com/search/code?q={query}{&page,per_page,sort,order
