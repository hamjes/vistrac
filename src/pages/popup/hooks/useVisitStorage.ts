import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useVisitStore = create(
  persist<{
    visits: Record<string, number>;
    setVisits: (url: string, value: number) => void;
  }>(
    (set, get) => ({
      visits: {},
      setVisits: (url, value) => set({ visits: { ...get().visits, [url]: value } }),
    }),
    {
      name: 'useVisitStorage', // name of the item in the storage (must be unique)
    },
  ),
);
