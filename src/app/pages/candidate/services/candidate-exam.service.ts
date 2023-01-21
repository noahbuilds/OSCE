import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CandidateModel, CandidateResponseDTO } from '../models/candidate';
import { ResourceCreated } from '../models/resource-created';


@Injectable({
  providedIn: 'root'
})
export class CandidateExamService {

  constructor(private http: HttpClient) { }

  startExam(procedureId: string): Observable<CandidateModel>{
   return this.http.get<CandidateModel>(
      `https://${environment.developmentIP}/caosce/examdelivery/api/candidate/exam/start/procedure/${procedureId}`
     ,{withCredentials: true})
  }

  autoSaveCandidateExam(procedureId: string, payload:CandidateResponseDTO):Observable<ResourceCreated>{
    return this.http.post<ResourceCreated>(
      `https://${environment.developmentIP}/caosce/examdelivery/api/candidate/exam/procedure/${procedureId}/autosave_exam`
    , payload, {withCredentials: true})
  }

  endExam(procedureId: string, timedOut: boolean, payload:CandidateResponseDTO):Observable<ResourceCreated>{
    return this.http.post<ResourceCreated>(
      `https://${environment.developmentIP}/caosce/examdelivery/api/candidate/exam/procedure/${procedureId}/end_exam/${timedOut}`
    ,payload, {withCredentials: true})
  }
}
