import create from 'zustand';

interface OptionMenuState {
  optionMenuModal: {
    showModal: boolean;
    isTopicPost: boolean;
    showDeleteFromCollection?: boolean;
  };
  setOptionMenuModal: (optionMenuModal: {
    showModal: boolean;
    isTopicPost: boolean;
    showDeleteFromCollection?: boolean;
  }) => void;
}

const useOptionMenuStore = create<OptionMenuState>(setOptionMenuModal => ({
  optionMenuModal: {
    showModal: false,
    isTopicPost: false,
    showDeleteFromCollection: false,
  },
  setOptionMenuModal: (optionMenuModal: {
    showModal: boolean;
    isTopicPost: boolean;
    showDeleteFromCollection?: boolean;
  }) => setOptionMenuModal({optionMenuModal}),
}));

export default useOptionMenuStore;
