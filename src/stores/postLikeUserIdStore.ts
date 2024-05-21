import create from 'zustand';

interface PostLikeUserIdState {
  postLikeUserId: [];
  setPostLikeUserId: (postLikeUserId: []) => void;
}

const usePostLikeUserId = create<PostLikeUserIdState>(setPostLikeUserId => ({
  postLikeUserId: [],
  setPostLikeUserId: (postLikeUserId: []) =>
    setPostLikeUserId({postLikeUserId}),
}));

export default usePostLikeUserId;
