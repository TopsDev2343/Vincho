import create from 'zustand';

interface DeleteTopicSate {
  deleteTopicModal: object;
  setDeleteTopicModal: (deleteTopicModal: object) => void;
}

const useDeleteTopicModalStore = create<DeleteTopicSate>(
  setDeleteTopicModal => ({
    deleteTopicModal: {
      showModal: false,
      topicId: null,
    },
    setDeleteTopicModal: (deleteTopicModal: object) =>
      setDeleteTopicModal({deleteTopicModal}),
  }),
);

export default useDeleteTopicModalStore;
