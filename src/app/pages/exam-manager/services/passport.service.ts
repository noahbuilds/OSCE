import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResourceCreated } from '../models/resource.created';

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  constructor(private http: HttpClient) { }

  downloadPassport():Observable<ResourceCreated>{
return this.http.get<ResourceCreated>(
  `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/download/download_passport`,
  {withCredentials: true}
)
  }
}
