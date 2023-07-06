import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PassportService {

  constructor(private http: HttpClient) { }

  getPassport(fileName: string): Observable<Blob>{
    return this.http.get(`http://${environment.developmentIP}/caosce/examdelivery/api/examiner/candidate${fileName}`,
      { withCredentials: true, responseType: "blob" });
  }
}
