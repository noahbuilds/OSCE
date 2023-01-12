import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonitorVivaService {

  constructor(private http: HttpClient) { }

  monitorViva(examId: string){
    this.http.get<any>(
      `${environment.developmentIP}/caosce/examdelivery/api/exammanager/monitor/viva/${examId}`
    )
  }
}
