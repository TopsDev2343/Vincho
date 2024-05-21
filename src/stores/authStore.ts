import create from 'zustand';

interface AuthState {
  userId: number | undefined;
  setUserId: (userId: number | undefined) => void;
}

const useAuthStore = create<AuthState>(setUserId => ({
  userId: undefined,
  setUserId: (userId: number | undefined) => setUserId({userId}),
}));

export default useAuthStore;
