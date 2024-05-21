import create from 'zustand';
import {storageHelper} from '~/utils/storageHelper';

type Topic = {
  title: string;
  id: string;
};

type AiFriend = {
  name: string;
  profile: string;
  topics: Topic[];
  description: string;
};

interface AiFriendsStore {
  aiFriends: AiFriend[];
  setAiFriends: (aiFriends: AiFriend[]) => void;
  initializeAiFriends: () => Promise<void>;
}

const storage = new storageHelper();

const useAiFriendsStore = create<AiFriendsStore>(set => ({
  aiFriends: [],

  async setAiFriends(aiFriends: AiFriend[]) {
    set({aiFriends});
    try {
      await storage.singleSave(
        JSON.stringify(aiFriends),
        'aiFriends',
        () => {},
      );
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  },

  async initializeAiFriends() {
    try {
      const storedData = await storage.singleGet('aiFriends');
      if (storedData !== null) {
        set({aiFriends: JSON.parse(storedData)});
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  },
}));

export default useAiFriendsStore;
