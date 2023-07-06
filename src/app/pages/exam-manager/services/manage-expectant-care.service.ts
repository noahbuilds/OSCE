import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { StartExam } from '../models/exam.model';
import { ResourceCreated } from '../models/resource.created';
import { ProgramModel } from '../models/program.model';
import { CandidateModel } from '../models/monitor.model';
import { AvailableExamModel } from '../models/available-exam.model';

@Injectable({
  providedIn: 'root'
})
export class ManageExpectantCareService {

  constructor(private http: HttpClient) {}

  startExpectantCare(examId: string): Observable<StartExam> {
    return this.http.get<StartExam>(
      `
    http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_client_care/${examId}/start_client_care
    `,
      { withCredentials: true }
    );
  }

  getAvailableExpectantCare(): Observable<AvailableExamModel> {
    return this.http.get<AvailableExamModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_client_care/clientcare_to_start`,
      { withCredentials: true }
    );
  }

  getProgramsTakingExpectantCare(examId: string): Observable <ProgramModel[]>{
    return this.http.get<ProgramModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_client_care/${examId}/programs`
    , {withCredentials: true})
    
  }

  getExpectantCareCandidates(examId: string): Observable <CandidateModel[]>{
    return this.http.get<CandidateModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_client_care/${examId}/client_care_candidates_all`
    , {withCredentials: true})
  }

  getExpectantCareCandidatesByProgram(examId: string, programId: string): Observable<CandidateModel[]>{
    return this.http.get<CandidateModel[]>(
        `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_client_care/${examId}/client_care_candidates_all/${programId}`
    , {withCredentials: true})
  }

  getExpectantCareProgressPerProgram(examId: string){
    return this.http.get(`
    http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_client_care/${examId}/client_care_progress_per_program`
    , {withCredentials: true})
  }

  endExpectantCare(examId: string): Observable< ResourceCreated>{
    return this.http.get< ResourceCreated>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_client_care/exam/${examId}/end_clinical_carw`
    , {withCredentials: true} )
  }
}
