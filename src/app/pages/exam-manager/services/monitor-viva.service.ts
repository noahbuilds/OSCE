import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CandidateModel, MonitorModel } from "../models/monitor.model";

@Injectable({
  providedIn: "root",
})
export class MonitorVivaService {
  constructor(private http: HttpClient) {}

  monitorViva(examId: string): Observable<MonitorModel> {
    return this.http.get<MonitorModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/monitor/viva/${examId}`,
      { withCredentials: true }
    );
  }

  monitorVivaCandidatesByProgram(
    examId: string,
    programId: string
  ): Observable<CandidateModel[]> {
    return this.http.get<CandidateModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/monitor/viva/${examId}/program/${programId}`,
      { withCredentials: true }
    );
  }
}
