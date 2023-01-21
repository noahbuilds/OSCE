export interface ProcedureModel {
  candidateDetails: {
    name: string;
    id: string;
    minute: number;
    seconds: number;
    startTime: string;
    endTime: string;
    activitiesScores: Array<ActivityScore>;
    examNumber: string;
    institution: string;
    programName: string;
    examinerName: string;
    
  };
  activities: Array<Activity>;
  candidateProcedureDetailsId: string;
  candidateProcedureActivitiesId: string;
}

export interface Activity {
  activity: string;
  maxScore: number;
  placement: number;
  id: string;
  score: number;
  gradeList?: string[];
}

export interface ActivityScore {
  activityId: string;
  score: number;
}

export interface CandidateGradedProcedureDTO{
  candidateId: string,
  minute: number,
  seconds: number,
  candidateProcedureActivitiesId: string,
  candidateProcedureDetailsId: string,
  programId: string,
  procedureId: string,
  activityScores: Array<ActivityScore>
}


export interface Procedure{
  
    name: string,
    id: string
  
}

