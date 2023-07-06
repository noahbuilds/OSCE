import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PassportService {
  constructor(private http: HttpClient) {}

  getPassport(fileName: string): Observable<Blob> {
    return this.http.get(
      `http://${environment.developmentIP}/caosce/examdelivery/api/candidate/exam${fileName}`,
      { withCredentials: true, responseType: "blob" }
    );
  }
}
