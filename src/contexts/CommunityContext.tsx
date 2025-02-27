import { Community } from '@/store/interfaces';
import { createContext, useContext } from 'react';

interface CommunityContextProps {
  myCommunities: Community[] | [],
  setCommunities: (communities: Community[])=> void;
}

export const CommunityContext = createContext<CommunityContextProps | undefined>(undefined);

export const useCommunityContext = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunityContext must be used within a CommunityContext Provider');
  }
  return context;
};