import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IpModel } from '../models/ip.model';
import { ResourceCreated } from '../models/resource.created';


@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private http: HttpClient) { }

  getIPs(): Observable<string[]>{
    return this.http.get<string[]>(
        `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_ips`
    ,
    {withCredentials: true})
  }

  addIP(payload:IpModel):Observable<ResourceCreated>{
   return this.http.post<ResourceCreated>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_ips`
      ,payload, {withCredentials: true})
  }
}
