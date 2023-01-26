import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OsceMonitor, OsceMonitorCard } from '../models/osce-monitor.model';


@Injectable({
  providedIn: 'root'
})
export class MonitorOsceService {

  constructor(private http: HttpClient) { }

getMonitorCards(examId: string):Observable<OsceMonitorCard[]>{
  return this.http.get<OsceMonitorCard[]>(
    `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/monitor/osce/cards/${examId}`
  , {withCredentials: true})
}

monitorObjectives(examId: string, programId: string): Observable<OsceMonitor[]>{
  return this.http.get<OsceMonitor[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/monitor/osce/objectives/${examId}/program/${programId}`
  , {withCredentials: true})
}

monitorProcedures(examId: string, programId: string): Observable<OsceMonitor[]>{
  return this.http.get<OsceMonitor[]>(
    `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/monitor/osce/procedures/${examId}/program/${programId}`
  , {withCredentials: true})
}
}
