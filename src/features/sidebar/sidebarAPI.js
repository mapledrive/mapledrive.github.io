import axios from 'axios';

export const fetchSidebarApi = async () => {
  try {
    // Используем CORS прокси для обхода ограничений
    const response = await axios.get(
      `https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/news/world/rss.xml`
    );

    if (response.data.status === 'ok') {
      return response.data.items.slice(0, 10).map(item => ({
        title: item.title,
        content: item.description,
        link: item.link,
        imageUrl: item.enclosure?.link || '',
        date: item.pubDate,
      }));
    }

    throw new Error('Failed to parse RSS feed');
  } catch (error) {
    console.error('RSS API error:', error);

    // Fallback данные
    return [
      {
        title: 'Latest World News Updates',
        content:
          'Stay informed with the latest global developments and breaking news from around the world.',
        link: '#',
        imageUrl: '',
        date: new Date().toISOString(),
      },
    ];
  }
};
