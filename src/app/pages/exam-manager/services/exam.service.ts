import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ExaminerModel, ProcedureModel } from "../models/examiner.model";
import { ExamModel } from "../models/exam.model";


@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }

  downloadExam(centerId:string): Observable<ExamModel>{
    return this.http.get<ExamModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/download/download_exam/${centerId}`,
      { withCredentials: true }
    )
  }

  getDownloadedExams(): Observable<ExamModel[]> {
    return this.http.get<ExamModel[]>(
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
