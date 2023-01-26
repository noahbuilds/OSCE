export interface ExamModel {
  examName?: string;
  downloadedDate?: string;
  totalCandidates?: number;
  totalPrograms?: number;
  totalExaminers?: number;
  vivaUploaded?: boolean;
  osceUploaded?: boolean;
 vivaDate:string,
   osceDate:string,
  programs?: Array<Program>;
}

export interface Program {
  totalProcedures?: number;
  examId?: string;
  programId?: string;
  totalCandidates?: number;
  totalExaminers?: number;
  programName?: string;
}

export interface StartExam{
  started: boolean,
  examId: string
}