import { createContext } from 'react';

const initialState = {
  currentTab: 0,
  setCurrentTab: (tab: number) => {}
};

export const ApplicantsContext = createContext(initialState);
