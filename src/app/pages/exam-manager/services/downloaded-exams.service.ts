import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DownloadedExamsModel } from "../models/downloaded-exams.model";
import { ExaminerModel, ProcedureModel } from "../models/examiner.model";


@Injectable({
  providedIn: 'root'
})
export class DownloadedExamsService {

  constructor(private http: HttpClient) { }

  getDownloadedExams(): Observable<DownloadedExamsModel[]> {
    return this.http.get<DownloadedExamsModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/downloaded_exams`,
      { withCredentials: true }
    )
  }

  getExaminersForAnExam(examId: string, programId: string):Observable<ExaminerModel[]>{
    return this.http.get<ExaminerModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/downloaded_exams/exam/${examId}/program/${programId}`,
      { withCredentials: true }
    )
  }

  addProcedureToExaminer(procedure:ProcedureModel){
    return this.http.post<ProcedureModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/downloaded_exams/examiner/add_procedure`,
      procedure,
      { withCredentials: true }
    )
  }

  updateExaminerStatus(examinerId: string, active:boolean){
    return this.http.patch(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/downloaded_exams/examiner/${examinerId}/active/${active}`,
      { withCredentials: true }

    )
  }
  
}
