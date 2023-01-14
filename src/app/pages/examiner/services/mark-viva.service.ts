import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CandidateModel} from '../models/candidate.model';
import { VivaGradeModel } from '../models/viva-grade.model';


@Injectable({
  providedIn: 'root'
})
export class MarkVivaService {

  constructor(private http: HttpClient) { }

  gradeCandidate(candidateId: string, payload:VivaGradeModel){
    return this.http.post<VivaGradeModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/examiner/markviva/candidate/${candidateId}`,
      payload,
      {withCredentials: true}
    )
  }

  getCandidateForGrading(examNumber: string, programId:string):Observable<any>{
    return this.http.get<CandidateModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/examiner/markviva/program/${programId}/candidate_for_grading/${examNumber}`,
      {withCredentials: true}
    )
  }

  getGradedCandidatesByProgram(programId: string): Observable<any>{
    return this.http.get<CandidateModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/examiner/markviva/program/${programId}/candidates`,
      {withCredentials: true}
    )
  }

}