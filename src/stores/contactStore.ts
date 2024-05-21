import create from 'zustand';

interface AuthState {
  contactInfo: boolean;
  setContactInfo: (contactInfo: boolean) => void;
}

const useContactStore = create<AuthState>(setContactInfo => ({
  contactInfo: false,
  setContactInfo: (contactInfo: boolean) => setContactInfo({contactInfo}),
}));

export default useContactStore;
