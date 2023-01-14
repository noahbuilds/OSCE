import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CandidateModel, VivaMonitorModel } from "../models/viva-monitor.model";

@Injectable({
  providedIn: "root",
})
export class MonitorVivaService {
  constructor(private http: HttpClient) {}

  monitorViva(examId: string): Observable<VivaMonitorModel> {
    return this.http.get<VivaMonitorModel>(
      `${environment.developmentIP}/caosce/examdelivery/api/exammanager/monitor/viva/${examId}`,
      { withCredentials: true }
    );
  }

  monitorVivaCandidatesByProgram(
    examId: string,
    programId: string
  ): Observable<CandidateModel[]> {
    return this.http.get<CandidateModel[]>(
      `${environment.developmentIP}/caosce/examdelivery/api/exammanager/monitor/viva/${examId}/program/${programId}`,
      { withCredentials: true }
    );
  }
}
