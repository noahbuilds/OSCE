import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MonitorModel, CandidateModel } from '../models/monitor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitorExpectantCareService {
  constructor(private http: HttpClient) { }


  monitorExpectantCare(examId: string): Observable<MonitorModel> {
    return this.http.get<MonitorModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/monitor/clinical_care/${examId}`,
      { withCredentials: true }
    );
  }

  monitorExpectantCareCandidatesByProgram(
    examId: string,
    programId: string
  ): Observable<CandidateModel[]> {
    return this.http.get<CandidateModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/monitor/clinical_care/${examId}/program/${programId}`,
      { withCredentials: true }
    );
  }
}
