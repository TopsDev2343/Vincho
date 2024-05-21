import create from 'zustand';

interface UserFollowingListState {
  userFollowingList: number[];
  setUserFollowingList: (userFollowingList: number[]) => void;
}

const UseFollowingListStore = create<UserFollowingListState>(
  setUserFollowingList => ({
    userFollowingList: [],
    setUserFollowingList: (userFollowingList: number[]) =>
      setUserFollowingList({userFollowingList}),
  }),
);

export default UseFollowingListStore;
