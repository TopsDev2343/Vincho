import create from 'zustand';

interface USerInfoState {
  userInfo: object;
  setUserInfo: (userInfo: object) => void;
}

const useUserInfoStore = create<USerInfoState>(setUserInfo => ({
  userInfo: {},
  setUserInfo: () => setUserInfo((state: object) => ({userInfo: state})),
}));

export default useUserInfoStore;
