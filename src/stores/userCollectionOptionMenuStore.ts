import create from 'zustand';

interface CollectionOptionMenuState {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const useCollectionOptionMenuStore = create<CollectionOptionMenuState>(setShowModal => ({
  showModal: false,
  setShowModal: (showModal: boolean) => setShowModal({showModal}),
}));

export default useCollectionOptionMenuStore;
