import create from 'zustand';

interface PostModalState {
  showPostModal: boolean;
  setShowPostModal: (showPostModal: boolean) => void;
}

const usePostModalStore = create<PostModalState>(setShowPostModal => ({
  showPostModal: false,
  setShowPostModal: (showPostModal: boolean) =>
    setShowPostModal({showPostModal}),
}));

export default usePostModalStore;
