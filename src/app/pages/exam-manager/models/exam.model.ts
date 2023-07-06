export interface ExamModel {
  examName: string,
    downloadedDate: string,
    totalCandidates: number,
    totalPrograms: number,
    totalExaminers: number,
    researchDate: string,
    clientCareDate: string,
    researchEndedDate: string,
    clientCareEndedDate: string,
    vivaUploaded: boolean,
    osceUploaded: boolean,
    clientCareUploaded: boolean,
    researchUploaded: boolean,
    vivaDate: string,
    osceDate: string,
    vivaEndedDate: string,
    osceEndedDate: string,
    programs: Array<Program>;
    examId: string;
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