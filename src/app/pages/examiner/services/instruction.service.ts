import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InstructionModel } from '../models/instruction.model';


@Injectable({
  providedIn: 'root'
})
export class InstructionService {

  constructor(private http: HttpClient) { }

  getProcedureReq(procedureId: string): Observable<InstructionModel>{
    return this.http.get<InstructionModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/examiner/instructions/procedure/${procedureId}/procedure_requirement`
    , 
    {withCredentials: true})

  }

  getCandidateInstruction(procedureId: string){
    return this.http.get<InstructionModel>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/examiner/instructions/procedure/${procedureId}/candidate_instruction`
    , 
    {withCredentials: true})
  }
}
