export const categories: { url: string; title: string }[] = [
  {
    title: '자유',
    url: 'free',
  },
  {
    title: '요리',
    url: 'cook',
  },
  {
    title: '생활',
    url: 'life',
  },
  {
    title: '퀴어',
    url: 'queer',
  },
];

export type CategoryName = '자유' | '요리' | '생활' | '퀴어';

export const urlToTitle = (url: string) => categories.find(category => category.url === url)?.title || '잘못된 url';
