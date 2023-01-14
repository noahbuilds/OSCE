export interface ExamModel {
   
        examName?: string;
        downloadedDate?: string;
        totalCandidates?: number;
        totalPrograms?: number;
        totalExaminers?: number;
        vivaUploaded?: boolean;
        osceUploaded?: boolean;
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

