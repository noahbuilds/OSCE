import { Status } from "src/app/shared/enum/status"
export interface MonitorModel {
  startTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  connectedToMonitoring: boolean;
  progressGraph: Array<ProgramProgressModel>;
  candidateList: Array<CandidateModel>;
}

export interface CandidateModel {
  name: string;
  stamp: string;
  examNumber: string;
  institution: string;
  programName: string;
  examinerName: string;
  status : Status
}

export interface ProgramProgressModel {
  programName: string;
  candidateCount: number;
  candidateCompletedCount: number;
}

export interface ProgramModel {
  name: string;
  id: string;
}
