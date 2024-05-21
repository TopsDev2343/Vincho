import create from 'zustand';

interface ReportUserSate {
  showReportModal: boolean;
  setShowReportModal: (showModal: boolean) => void;
}

const useReportUserStore = create<ReportUserSate>(setShowReportModal => ({
  showReportModal: false,
  setShowReportModal: (showReportModal: boolean) =>
    setShowReportModal({showReportModal}),
}));

export default useReportUserStore;
