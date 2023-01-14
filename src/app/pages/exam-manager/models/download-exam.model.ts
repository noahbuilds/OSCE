export interface DownloadExamModel {
  examName: string;
  osceDate: string;
  vivaDate: string;
  totalPrograms: number;
  totalExaminers: number;
  totalCandidates: number;
  programDetails: Array<ProgramDetail>;
}

export interface ProgramDetail {
  programName: string;
  totalExaminers: number;
  totalCandidates: number;
}
