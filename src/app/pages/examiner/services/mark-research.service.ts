import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResourceCreated } from '../models/resource-created';
import { ResearchCandidateModel} from '../models/candidate.model';
import { ResearchModel } from '../models/research.model';

@Injectable({
  providedIn: 'root'
})
export class MarkResearchService {

  constructor(private http: HttpClient) { }

  gradeCandidate(candidateId: string, payload:ResearchModel):Observable <ResourceCreated>{
    return this.http.post<ResourceCreated>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/examiner/markresearch/candidate/${candidateId}`,
      payload,
      {withCredentials: true}
    )
  }

  getCandidateForGrading(examNumber: string, programId:string):Observable<ResearchCandidateModel>{
    return this.http.get<ResearchCandidateModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/examiner/markresearch/program/${programId}/candidate_for_grading/${examNumber}`,
      {withCredentials: true}
    )
  }

  getGradedCandidatesByProgram(programId: string): Observable<ResearchCandidateModel[]>{
    return this.http.get<ResearchCandidateModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/examiner/markresearch/program/${programId}/candidates`,
      {withCredentials: true}
    )
  }
}
