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
export class ManageResearchService {

  constructor(private http: HttpClient) {}

  startResearch(examId: string): Observable<StartExam> {
    return this.http.get<StartExam>(
      `
    http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_research/${examId}/startResearch
    `,
      { withCredentials: true }
    );
  }

  getAvailableResearch(): Observable<AvailableExamModel> {
    return this.http.get<AvailableExamModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_research/research_to_start`,
      { withCredentials: true }
    );
  }

  getProgramsTakingResearch(examId: string): Observable <ProgramModel[]>{
    return this.http.get<ProgramModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_research/${examId}/programs`
    , {withCredentials: true})
    
  }

  getResearchCandidates(examId: string): Observable <CandidateModel[]>{
    return this.http.get<CandidateModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_research/${examId}/research_candidates_all`
    , {withCredentials: true})
  }

  getResearchCandidatesByProgram(examId: string, programId: string): Observable<CandidateModel[]>{
    return this.http.get<CandidateModel[]>(
        `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_research/${examId}/research_candidates_all/${programId}`
    , {withCredentials: true})
  }

  getResearchProgressPerProgram(examId: string){
    return this.http.get(`
    http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_research/${examId}/research_progress_per_program`
    , {withCredentials: true})
  }

  endResearch(examId: string): Observable< ResourceCreated>{
    return this.http.get< ResourceCreated>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_research/exam/${examId}/end_Research`
    , {withCredentials: true} )
  }
}
