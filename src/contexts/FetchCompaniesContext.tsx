import { createContext, useContext } from 'react';

interface FetchCompaniesContextProps {
  fetchCompanies: () => Promise<void>;
}

export const FetchCompaniesContext = createContext<FetchCompaniesContextProps | undefined>(undefined);

export const useFetchCompanies = () => {
  const context = useContext(FetchCompaniesContext);
  if (!context) {
    throw new Error('useFetchCompanies must be used within a FetchCompaniesProvider');
  }
  return context;
};