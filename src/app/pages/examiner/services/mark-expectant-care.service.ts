import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResourceCreated } from '../models/resource-created';
import { ExpectantCareCandidateModel} from '../models/candidate.model';
import { ExpectantCareModel } from '../models/expectant-care.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarkExpectantCareService {

  constructor(private http: HttpClient) { }



  gradeCandidate(candidateId: string, payload:ExpectantCareModel):Observable <ResourceCreated>{
    return this.http.post<ResourceCreated>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/examiner/mark_client_care/candidate/${candidateId}`,
      payload,
      {withCredentials: true}
    )
  }

  getCandidateForGrading(examNumber: string, programId:string):Observable<ExpectantCareCandidateModel>{
    return this.http.get<ExpectantCareCandidateModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/examiner/mark_client_care/program/${programId}/candidate_for_grading/${examNumber}`,
      {withCredentials: true}
    )
  }

  getGradedCandidatesByProgram(programId: string): Observable<ExpectantCareCandidateModel[]>{
    return this.http.get<ExpectantCareCandidateModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/examiner/mark_client_care/program/${programId}/candidates`,
      {withCredentials: true}
    )
  }
}
