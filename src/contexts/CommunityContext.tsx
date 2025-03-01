import { Community, Friend } from '@/store/interfaces';
import { createContext, useContext } from 'react';

interface CommunityContextProps {

  //Community Context variables
  headerTitle: string,
  allCommunities: Community[] | [],
  myCommunities: Community[] | [],
  myFriends: Friend[],

  //Community Context Setter Functions
  setAllCommunities: (communities: Community[]) => void;
  setHeaderTitle: (title: string) =>void,
  setMyCommunities: (communities: Community[]) => void;

  //Join community fetch req
  handleJoinCommunity: (communityId: string, userId: string) => void;

}

export const CommunityContext = createContext<CommunityContextProps | undefined>(undefined);

export const useCommunityContext = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunityContext must be used within a CommunityContext Provider');
  }
  return context;
};