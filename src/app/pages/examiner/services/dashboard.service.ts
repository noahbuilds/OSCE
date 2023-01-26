import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DashboardModel } from '../models/dashboard.model';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardData(programId: string):Observable<DashboardModel>{
    return this.http.get<DashboardModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/examiner/dashboard/program/${programId}`,
      { withCredentials: true });
  }
}
