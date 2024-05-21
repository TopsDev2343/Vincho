import create from 'zustand';

interface AuthRefreshState {
  refreshAuth: boolean;
  setRefreshAuth: (refreshAuth: boolean) => void;
}

const useAuthRefreshStore = create<AuthRefreshState>(setRefreshAuth => ({
  refreshAuth: false,
  setRefreshAuth: (refreshAuth: boolean) => setRefreshAuth({refreshAuth}),
}));

export default useAuthRefreshStore;
