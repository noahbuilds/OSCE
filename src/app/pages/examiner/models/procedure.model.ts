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
}

export interface ActivityScore {
  activityId: string;
  score: number;
}
