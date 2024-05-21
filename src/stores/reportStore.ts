import create from 'zustand';

interface ReportSate {
  showReportModal: {
    showModal: boolean;
    isTopicPost: boolean;
  };
  setShowReportModal: (showReportModal: {
    showModal: boolean;
    isTopicPost: boolean;
  }) => void;
}
const useReportStore = create<ReportSate>(setShowReportModal => ({
  showReportModal: {
    showModal: false,
    isTopicPost: false,
  },
  setShowReportModal: (showReportModal: {
    showModal: boolean;
    isTopicPost: boolean;
  }) => setShowReportModal({showReportModal}),
}));

export default useReportStore;
