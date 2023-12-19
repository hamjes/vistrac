import { useQuery } from '@tanstack/react-query';

export const useCurrentTabInfo = () => {
  return useQuery({
    queryKey: ['currentTabInfo'],
    queryFn: async (): Promise<{ url: string; title: string; origin: string; }> => {
      return await new Promise(resolve => {
        chrome.tabs.query({ active: true }, tabs => {
          const [tab] = tabs;

          const origin = new URL(tab.url).origin;

          resolve({
            url: tab.url,
            origin,
            title: tab.title,
          });
        });
      });
    },
  });
};
