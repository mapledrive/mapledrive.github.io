import axios from 'axios';

export interface GuardianApiResponse {
  response: {
    results: GuardianArticle[];
  };
}

export interface GuardianArticle {
  webTitle: string;
  fields: {
    body?: string;
  };
}

export interface CleanedArticle {
  title: string;
  content: string;
}

export const fetchSidebarApi = async (): Promise<CleanedArticle[]> => {
  const response = await axios.get<GuardianApiResponse>(
    'https://content.guardianapis.com/search?api-key=test&show-fields=body&page-size=5'
  );

  return response.data.response.results.map((post): CleanedArticle => {
    const rawContent = post.fields?.body || '';
    const cleanText = rawContent
      .replace(/<[^>]*>?/gm, '')
      .replace(/\s+/g, ' ')
      .replace(/\[.*?\]/g, '')
      .trim()
      .substring(0, 200);

    return {
      title: post.webTitle,
      content: cleanText || 'No content available',
    };
  });
};
