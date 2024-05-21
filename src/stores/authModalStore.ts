import create from 'zustand';

interface ShowAuthSate {
  showAuthModal: boolean;
  setShowAuthModal: (showModal: boolean) => void;
}

const useAuthModalStore = create<ShowAuthSate>(setShowAuthModal => ({
  showAuthModal: false,
  setShowAuthModal: (showAuthModal: boolean) =>
    setShowAuthModal({showAuthModal}),
}));

export default useAuthModalStore;
