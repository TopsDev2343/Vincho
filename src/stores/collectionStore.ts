import create from 'zustand';
 
interface CollectionState {
  showCollectionModal: boolean;
  setShowCollectionModal: (showCollectionModal: boolean) => void;
}

const useCollectionStore = create<CollectionState>(setShowCollectionModal => ({
  showCollectionModal: false,
  setShowCollectionModal: (showCollectionModal: boolean) =>
    setShowCollectionModal({ showCollectionModal }),
}));

export default useCollectionStore;
