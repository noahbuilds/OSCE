import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResourceCreated } from '../models/resource-created';
import { VivaCandidateModel} from '../models/candidate.model';
import { VivaModel } from '../models/viva.model';


@Injectable({
  providedIn: 'root'
})
export class MarkVivaService {

  constructor(private http: HttpClient) { }

  gradeCandidate(candidateId: string, payload:VivaModel):Observable <ResourceCreated>{
    return this.http.post<ResourceCreated>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/examiner/markviva/candidate/${candidateId}`,
      payload,
      {withCredentials: true}
    )
  }

  getCandidateForGrading(examNumber: string, programId:string):Observable<VivaCandidateModel>{
    return this.http.get<VivaCandidateModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/examiner/markviva/program/${programId}/candidate_for_grading/${examNumber}`,
      {withCredentials: true}
    )
  }

  getGradedCandidatesByProgram(programId: string): Observable<VivaCandidateModel[]>{
    return this.http.get<VivaCandidateModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/examiner/markviva/program/${programId}/candidates`,
      {withCredentials: true}
    )
  }

 

}
