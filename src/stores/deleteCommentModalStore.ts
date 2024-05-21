import create from 'zustand';

interface DeleteCommentSate {
  deleteCommentModal: object;
  setDeleteCommentModal: (deleteCommentModal: object) => void;
}

const useDeleteCommentModalStore = create<DeleteCommentSate>(
  setDeleteCommentModal => ({
    deleteCommentModal: {
      showModal: false,
      isTopicComments: false,
      commentId: null,
    },
    setDeleteCommentModal: (deleteCommentModal: object) =>
      setDeleteCommentModal({deleteCommentModal}),
  }),
);

export default useDeleteCommentModalStore;
