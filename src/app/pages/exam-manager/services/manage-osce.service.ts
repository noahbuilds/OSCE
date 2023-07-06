import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { StartExam } from "../models/exam.model";
import { AvailableExamModel } from "../models/available-exam.model";
import { ResourceCreated } from "../models/resource.created";

@Injectable({
  providedIn: "root",
})
export class ManageOsceService {
  constructor(private http: HttpClient) {}

  startOsce(examId: string): Observable<StartExam> {
    return this.http.get<StartExam>(
      `
    http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_osce/${examId}/startOsce
    `,
      { withCredentials: true }
    );
  }

  getAvailableOsce(): Observable<AvailableExamModel> {
    return this.http.get<AvailableExamModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_osce/osce_to_start`,
      { withCredentials: true }
    );
  }

  endOsce(examId: string): Observable< ResourceCreated>{
    return this.http.get< ResourceCreated>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_osce/exam/${examId}/end_Osce`
    , {withCredentials: true} )
  }
}
