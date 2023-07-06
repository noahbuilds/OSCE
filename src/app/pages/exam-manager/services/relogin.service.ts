import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReloginModel } from '../models/relogin.model';
import { ResourceCreated } from '../models/resource.created';

@Injectable({
  providedIn: 'root'
})
export class ReloginService {

  constructor(private http: HttpClient) { }

  allowRelogin(examId: string, examNumber: ReloginModel): Observable<ResourceCreated>{
  return this.http.post<ResourceCreated>(
    `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_osce/exam/${examId}/relogin`,
  examNumber, {withCredentials: true})
  }
}
