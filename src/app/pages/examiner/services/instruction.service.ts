import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InstructionModel } from '../models/instruction.model';
import { Procedure } from '../models/procedure.model';


@Injectable({
  providedIn: 'root'
})
export class InstructionService {

  constructor(private http: HttpClient) { }

  getProcedureReq(procedureId: string): Observable<InstructionModel>{
    return this.http.get<InstructionModel>(
      `https://${environment.developmentIP}/caosce/examdelivery/api/examiner/instructions/procedure/${procedureId}/procedure_requirement`
    , 
    {withCredentials: true})

  }

  getCandidateInstruction(procedureId: string): Observable<InstructionModel>{
    return this.http.get<InstructionModel>(
      `https://${environment.developmentIP}/caosce/examdelivery/api/examiner/instructions/procedure/${procedureId}/candidate_instruction`
    , 
    {withCredentials: true})
  }

  getProcedures(programId: string): Observable<Procedure[]>{
    return this.http.get<Procedure[]>(
      `https://${environment.developmentIP}/caosce/examdelivery/api/examiner/instructions/program/${programId}/list_procedures`
      
    , {withCredentials: true})
  }
}
