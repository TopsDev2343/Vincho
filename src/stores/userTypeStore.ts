import create from 'zustand';
import {appUserType} from '~/@types/global';

interface UserTypeState {
  userType: string;
  setUserType: (userType: string) => void;
}

const useUserTypeStore = create<UserTypeState>(setUserType => ({
  userType: appUserType.Artist,
  setUserType: (userType: string) => setUserType({userType}),
}));

export default useUserTypeStore;
