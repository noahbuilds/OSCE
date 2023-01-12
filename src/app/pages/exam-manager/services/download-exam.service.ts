import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DownloadExam } from '../models/download-exam';

@Injectable({
  providedIn: 'root'
})
export class DownloadExamService {

  constructor(private http: HttpClient) { }

  downloadExam(centerId:string): Observable<DownloadExam>{
    return this.http.get<DownloadExam>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/download/download_exam/${centerId}`,
      { withCredentials: true }
    )
  }
}
