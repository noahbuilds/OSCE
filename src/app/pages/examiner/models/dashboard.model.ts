export interface DashboardModel {
  vivaProgress?: {
    programName?: string;
    candidateCount?: number;
    candidateCompletedCount?: number;
  };
  procedureProgressList?: Array<ProgressStatus>;
  objectiveProgressList?: Array<ProgressStatus>;
  procedureCandidateProgressList?: Array<CandidateProgress>;
  procedureObjectiveCandidateProgressList?: Array<CandidateProgress>;
}

export interface ProgressStatus {
  completedCandidates?: number;
  procedureId?: string;
  totalCandidates?: number;
  procedureName?: string;
}

export interface CandidateProgress {
  name?: string;
  startTime?: string;
  endTime?: string;
  procedureId?: string;
  institution?: string;
  examNumber?: string;
  procedureName?: string;
  examinerName?: string;
}
