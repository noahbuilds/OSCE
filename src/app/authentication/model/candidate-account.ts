import { Role } from "src/app/shared/enum/role"

export interface CandidateAccount {
    id: string,
  examNumber: string,
  name: string,
  programId: string,
  programName: string,
  role: Role.CANDIDATE,
  proceduresList: Array<CandidateProcedure>
}

export interface CandidateProcedure{
    startTime: string,
      endTime: string,
      procedureName: string,
      procedureId: string
    
}