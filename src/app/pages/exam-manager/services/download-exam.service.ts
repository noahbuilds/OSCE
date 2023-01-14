import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DownloadExamModel} from '../models/download-exam.model';

@Injectable({
  providedIn: 'root'
})
export class DownloadExamService {

  constructor(private http: HttpClient) { }

  downloadExam(centerId:string): Observable<DownloadExamModel>{
    return this.http.get<DownloadExamModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/download/download_exam/${centerId}`,
      { withCredentials: true }
    )
  }
}
