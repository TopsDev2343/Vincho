import create from 'zustand';

interface CollectionListStore {
  userCollectionModal: boolean;
  setUserCollectionModal: (showModal: boolean) => void;
}

const userCollectionListStore = create<CollectionListStore>(setUserCollectionModal => ({
  userCollectionModal: false,
  setUserCollectionModal: (userCollectionModal: boolean) =>
    setUserCollectionModal({ userCollectionModal }),
}));

export default userCollectionListStore;
