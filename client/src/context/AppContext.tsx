import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
  theme: 'light' | 'dark';
  isLoading: boolean;
  notification: string | null;
}

interface AppContextType extends AppState {
  setTheme: (theme: 'light' | 'dark') => void;
  setLoading: (loading: boolean) => void;
  showNotification: (message: string) => void;
  clearNotification: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    theme: 'light',
    isLoading: false,
    notification: null,
  });

  const setTheme = (theme: 'light' | 'dark') => setState(s => ({ ...s, theme }));
  const setLoading = (isLoading: boolean) => setState(s => ({ ...s, isLoading }));
  const showNotification = (notification: string) => setState(s => ({ ...s, notification }));
  const clearNotification = () => setState(s => ({ ...s, notification: null }));

  return (
    <AppContext.Provider value={{ ...state, setTheme, setLoading, showNotification, clearNotification }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
