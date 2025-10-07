'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

interface TabContextType {
  activeResumeTab: string;
  setActiveResumeTab: (tab: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: ReactNode }) {
  const [activeResumeTab, setActiveResumeTab] = useState('experience');

  return (
    <TabContext.Provider value={{ activeResumeTab, setActiveResumeTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTabContext() {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error('useTabContext must be used within a TabProvider');
  }
  return context;
}