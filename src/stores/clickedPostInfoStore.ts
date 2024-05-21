import create from 'zustand';

interface PostInfoState {
  postInfo: object;
  setPostInfo: (postInfo: object) => void;
}

const useClickedPostInfoStore = create<PostInfoState>(setPostInfo => ({
  postInfo: {},
  setPostInfo: (postInfo: object) => setPostInfo({postInfo}),
}));

export default useClickedPostInfoStore;
