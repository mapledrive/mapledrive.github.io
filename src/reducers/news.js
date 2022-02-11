let initialState = [
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
];


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_REPOS':
      return action.repos;
    case 'CLEAR_REPOS':
      return [];
    default:
      return state;
  }
};

export default reducer;