import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ExaminerModel, ExaminerProcedureModel, ProcedureModel } from "../models/examiner.model";
import { ExamModel } from "../models/exam.model";
import { ResourceCreated } from "../models/resource.created";


@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }

  downloadExam(): Observable<ExamModel>{
    return this.http.get<ExamModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/download/download_exam`,
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

  addProcedureToExaminer(procedure:ExaminerProcedureModel){
    return this.http.post<ResourceCreated>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/downloaded_exams/examiner/add_procedure`,
      procedure,
      { withCredentials: true }
    )
  }

  getProcedures(examId: string, programId: string):Observable< ProcedureModel[]>{
    return this.http.get<ProcedureModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/downloaded_exams/exam/${examId}/program/${programId}/procedures`,
      
      {withCredentials: true}
    )
  }

  updateExaminerStatus(examinerId: string, active:boolean){
    return this.http.get(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/downloaded_exams/examiner/${examinerId}/active/${active}`,
      { withCredentials: true }

    )
  }
  
}
