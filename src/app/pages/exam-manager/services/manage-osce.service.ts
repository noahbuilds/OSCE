import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { StartExam } from "../models/exam.model";
import { OsceModel } from "../models/osce.model";
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

  getAvailableOsce(): Observable<OsceModel> {
    return this.http.get<OsceModel>(
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
