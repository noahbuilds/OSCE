import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageVivaService {

  constructor(private http: HttpClient) { }

  startViva(examId: string): Observable<boolean>{
    return this.http.get<boolean>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_viva/${examId}/startViva`,
      { withCredentials: true }
    )
  }

  getVivaCandidates(examId:string, programId:string){
    return this.http.get<boolean>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/manage_viva/${examId}/startViva`,
      { withCredentials: true }
    )
  }

  getVivaCandidatesInAProgram(){

  }

  getVivaProgressPerProgram(){

  }

  getProgramsTakingViva(){

  }

}
