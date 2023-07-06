import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProgramModel } from '../models/program.model';
import { ResourceCreated } from '../models/resource.created';


@Injectable({
  providedIn: 'root'
})
export class ManageExamService {

  constructor(private http: HttpClient) { }


  getPrograms(examId: string): Observable< ProgramModel[]>{
    return this.http.get<ProgramModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_exam/exam/${examId}/programs`
    , {withCredentials: true})
  }

  synchronizePrograms(examId:string): Observable<ProgramModel[]>{
    return this.http.get<ProgramModel[]>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_viva/${examId}/programs`
    , {withCredentials: true})
  }

  synchronizeExaminers(examId:string, programId: string){
    return this.http.get<ResourceCreated>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_exam/${examId}/synchronize/program/examiner/${programId}`
    , {withCredentials: true})
  }

  synchronizeCandidates(examId: string, programId: string){
    return this.http.get(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_exam/${examId}/synchronize/program/candidates/${programId}`
    , {withCredentials: true})
  }

  uploadOsce(examId: string): Observable<ResourceCreated>{
    return this.http.get<ResourceCreated>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_exam/exam/${examId}/upload_osce`
    , {withCredentials: true})
  }

  uploadViva(examId: string): Observable<ResourceCreated>{
    return this.http.get<ResourceCreated>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_exam/exam/${examId}/upload_viva`
    , {withCredentials: true})
  }

  uploadResearch(examId: string): Observable< ResourceCreated>{
    return this.http.get<ResourceCreated>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_exam/exam/${examId}/upload_research`
    , {withCredentials: true})
  }

  uploadExpectantCare(examId: string): Observable <ResourceCreated>{
    return this.http.get<ResourceCreated>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_exam/exam/${examId}/upload_clinical_care`
    , {withCredentials: true})
  }

}
