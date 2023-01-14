import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { OsceModel } from "../models/osce.model";

@Injectable({
  providedIn: "root",
})
export class ManageOsceService {
  constructor(private http: HttpClient) {}

  startOsce(examId: string): Observable<boolean> {
    return this.http.get<boolean>(
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
}
