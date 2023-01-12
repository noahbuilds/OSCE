import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DownloadedExams } from "../models/downloaded-exams";

@Injectable({
  providedIn: 'root'
})
export class DownloadedExamsService {

  constructor(private http: HttpClient) { }

  getDownloadedExams(): Observable<DownloadedExams[]> {
    return this.http.get<DownloadedExams[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/downloaded_exams`,
      { withCredentials: true }
    )
  }

  getExaminersForAnExam(examId: string, programId: string){
    return this.http.get<DownloadedExams[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/downloaded_exams/exam/${examId}/program/${programId}`,
      { withCredentials: true }
    )
  }
  
}
