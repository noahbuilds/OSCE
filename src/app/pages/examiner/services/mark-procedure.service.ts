import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ResourceCreated } from "../models/resource-created";
import { CandidateGradedProcedureDTO, ProcedureModel } from "../models/procedure.model";

@Injectable({
  providedIn: "root",
})
export class MarkProcedureService {

procedure:any = 
{
  "candidateDetails": {
    "name": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "minute": 0,
    "seconds": 0,
    "startTime": "2023-01-14T09:54:26.743Z",
    "endTime": "2023-01-14T09:54:26.743Z",
    "activitiesScores": [
      {
        "activityId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "score": 0
      }
    ],
    "examNumber": "string",
    "institution": "string",
    "programName": "string",
    "examinerName": "string"
  },
  "activities": [
    {
      "activity": "1",
      "maxScore": 0,
      "placement": 0,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "score": 0
    },
    {
      "activity": "2",
      "maxScore": 0,
      "placement": 0,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "score": 0
    },
    {
      "activity": "3",
      "maxScore": 0,
      "placement": 0,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "score": 0
    },
  ],
  "candidateProcedureDetailsId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "candidateProcedureActivitiesId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
  constructor(private http: HttpClient) {}

  getCandidateToGrade(
    examId: string,
    examinerId: string,
    programId: string,
    procedureId: string,
    examNumber: string
  ): Observable<ProcedureModel> {
    return this.http.get<ProcedureModel>(
      `https://${environment.developmentIP}/caosce/examdelivery/api/examiner/markprocedure/exam/${examId}/examiner/${examinerId}/program/${programId}/procedure/${procedureId}/candidate/${examNumber}`,
      { withCredentials: true }
    );
  }

  autoSaveCandidateProcedure(payload: CandidateGradedProcedureDTO): Observable< ResourceCreated> {
    return this.http.post<ResourceCreated>(
      `https://${environment.developmentIP}/caosce/examdelivery/api/examiner/markprocedure/autosave/procedure`,
      payload,
      { withCredentials: true }
    );
  }

  candidateTimedOut(timedOut: boolean, payload: CandidateGradedProcedureDTO) {
    return this.http.post(
      `https://${environment.developmentIP}/caosce/examdelivery/api/examiner/markprocedure/end/procedure/${timedOut}`,
      payload,
      { withCredentials: true }
    );
  }
}
