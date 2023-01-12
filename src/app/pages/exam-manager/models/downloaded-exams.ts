export interface DownloadedExams {
  examName: string;
  downloadedDate: string;
  totalCandidates: number;
  totalPrograms: number;
  totalExaminers: number;
  vivaUploaded: boolean;
  osceUploaded: boolean;
  program: ProgramDetails;
}

export interface ProgramDetails {
  totalProcedures: number;
  examId: string;
  programId: string;
  totalCandidates: number;
  totalExaminers: number;
  programName: string;
}
