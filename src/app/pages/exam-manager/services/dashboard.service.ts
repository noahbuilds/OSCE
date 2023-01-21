import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DashboardModel } from "../models/dashboard.model";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<DashboardModel> {
    return this.http.get<DashboardModel>(
      `https://${environment.developmentIP}/caosce/examdelivery/api/exammanager/dashboard`,
      { withCredentials: true }
    );
  }
}
