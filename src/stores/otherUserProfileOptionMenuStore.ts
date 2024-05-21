import create from 'zustand';

interface otherUserProfileOptionMenuStore {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const useOtherUserProfileOptionMenuStore = create<otherUserProfileOptionMenuStore>(setShowModal => ({
  showModal: false,
  setShowModal: (showModal: boolean) => setShowModal({showModal}),
}));

export default useOtherUserProfileOptionMenuStore;
