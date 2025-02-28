import { createContext, useContext } from 'react';

interface DashboardContextProps {
  collapsed: boolean;
  navOpen: boolean;
  headerTitle: string;
  selectedCompany: string;
  setHeaderTitle: (title: string) => void;
  setSelectedCompany: (title: string) => void;
  setNavOpen: (navOpen: boolean) => void;
  fetchCompanies: () => Promise<void>;
}

export const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardContext Provider');
  }
  return context;
};