import { Status } from "src/app/shared/enum/status"

export interface VivaCandidateModel {
  id: string,
  name: string,
  programId: string,
  stamp: string,
  score: number,
  examNumber: string,
  institution: string,
  programName: string,
  vivaScoreId:string,
  examinerName: string,
  status : Status
}

export interface ResearchCandidateModel {
  id: string,
  name: string,
  programId: string,
  stamp: string,
  score: number,
  examNumber: string,
  institution: string,
  programName: string,
  vivaScoreId:string,
  examinerName: string,
  status : Status
}

export interface ExpectantCareCandidateModel {
  id: string,
  name: string,
  programId: string,
  stamp: string,
  score: number,
  examNumber: string,
  institution: string,
  programName: string,
  vivaScoreId:string,
  examinerName: string,
  maxClientCareScore: number,
  status : Status
}

