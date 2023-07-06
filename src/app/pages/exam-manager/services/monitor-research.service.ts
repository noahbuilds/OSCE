import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { MonitorModel, CandidateModel } from '../models/monitor.model';

@Injectable({
  providedIn: 'root'
})
export class MonitorResearchService {

  constructor(private http: HttpClient) { }


  monitorResearch(examId: string): Observable<MonitorModel> {
    return this.http.get<MonitorModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/monitor/research/${examId}`,
      { withCredentials: true }
    );
  }

  monitorResearchCandidatesByProgram(
    examId: string,
    programId: string
  ): Observable<CandidateModel[]> {
    return this.http.get<CandidateModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/monitor/research/${examId}/program/${programId}`,
      { withCredentials: true }
    );
  }
}
