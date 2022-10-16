import { createSlice } from '@reduxjs/toolkit';

var dummy = [
  {
    title: 'Startup develops EV battery that can last for 20 years',
    content:
      'A Harvard-backed startup has developed a battery suitable for electric vehicles that is capable of fully charging in three minutes and can last for 20 years. Based on lithium-metal technology, the battery can charge over 10,000 cycles in a lifetime. Adden Energy has received $5.15 million in funding to further advance the technology and commercialise the battery. ',
  },
  {
    title: 'World first space tourist Dennis Tito, his wife buy',
    content:
      'Dennis Tito, who became the world first-ever space tourist in 2001, and his wife Akiko have purchased two tickets on SpaceX Starship rocket to fly around the Moon on a week-long mission. The couple paid an undisclosed amount and will travel with 10 other passengers. At 82, Tito could become the oldest person to go into orbit and deep space.',
  },
  {
    title: 'Spain newspaper uses snake charmer cartoon for',
    content:
      'Zerodha CEO Nithin Kamath has criticised a Spanish newspaper for using the caricature of a snake charmer to represent India. He shared a picture of La Vanguardia front page on Twitter, which showed the caricature with the headline, The Hour of the Indian Economy',
  },
  {
    title: 'Layoffs will be the absolute last thing at Zoho',
    content:
      'Software startup Zoho CEO Sridhar Vembu said that layoffs will be the absolute last thing that the company will ever consider.',
  },
];

const initialState = {
  list: dummy,
  isLoading: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    fetchSidebarNews: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    fetchSidebarNewsSuccess: (state, action) => {
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      };
    },
    fetchSidebarNewsError: (state, action) => ({
      ...state,
      list: action.payload,
      isLoading: false,
    }),
  },
});

export const {
  fetchSidebarNews,
  fetchSidebarNewsSuccess,
  fetchSidebarNewsError,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
