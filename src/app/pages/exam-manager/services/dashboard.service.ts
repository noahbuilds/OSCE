import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ExamStatus } from "../models/exam-status";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getExamStatus(): Observable<ExamStatus> {
    return this.http.get<ExamStatus>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/dashboard`,
      { withCredentials: true }
    );
  }
}
