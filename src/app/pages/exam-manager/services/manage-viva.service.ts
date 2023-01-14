import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CandidateModel, ProgramModel, ProgramProgressModel } from "../models/viva-monitor.model";
import { VivaModel } from "../models/viva.model";

@Injectable({
  providedIn: "root",
})
export class ManageVivaService {
  constructor(private http: HttpClient) {}

  startViva(examId: string): Observable<boolean> {
    return this.http.get<boolean>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_viva/${examId}/startViva`,
      { withCredentials: true }
    );
  }

  getVivaCandidates(examId: string): Observable<CandidateModel[]> {
    return this.http.get<CandidateModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_viva/${examId}/viva_candidates_all`,
      { withCredentials: true }
    );
  }

  getVivaCandidatesInAProgram(
    examId: string,
    programId: string
  ): Observable<CandidateModel[]> {
    return this.http.get<CandidateModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_viva/${examId}/viva_candidates_all/${programId}`,
      { withCredentials: true }
    );
  }

  getVivaProgressPerProgram(examId: string): Observable<ProgramProgressModel[]> {
    return this.http.get<ProgramProgressModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_viva/${examId}/viva_progress_per_program`,
      { withCredentials: true }
    );
  }

  getProgramsTakingViva(examId: string): Observable<ProgramModel[]> {
    return this.http.get<ProgramModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_viva/${examId}/programs`,
      { withCredentials: true }
    );
  }

  getAvailableViva(): Observable<VivaModel> {
    return this.http.get<VivaModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_viva/viva_to_start`,
      { withCredentials: true }
    );
  }
}
