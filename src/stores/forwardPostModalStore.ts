import create from 'zustand';

interface ForwardPostModalState {
  showForwardPostModal: boolean;
  setShowForwardPostModal: (showForwardPostModal: boolean) => void;
}

const useForwardPostModalStore = create<ForwardPostModalState>(
  setShowForwardPostModal => ({
    showForwardPostModal: false,
    setShowForwardPostModal: (showForwardPostModal: boolean) =>
      setShowForwardPostModal({showForwardPostModal}),
  }),
);

export default useForwardPostModalStore;
