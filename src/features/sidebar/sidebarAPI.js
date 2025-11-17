import axios from 'axios';

export const fetchSidebarApi = () => {
  return [
    {
      title: 'Latest World News Updates',
      content: 'Stay informed with the latest global developments and breaking news from around the world.',
      link: '#',
      imageUrl: '',
      date: new Date().toISOString(),
    },
  ];
};
