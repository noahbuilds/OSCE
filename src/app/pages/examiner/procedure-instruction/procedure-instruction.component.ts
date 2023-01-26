import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InstructionModel } from '../models/instruction.model';
import { InstructionService } from '../services/instruction.service';
import { Procedure } from '../models/procedure.model';
import { ExaminerAccountService } from 'src/app/authentication/services/examiner-account.service';
import { ExaminerAccount } from 'src/app/authentication/model/examiner-account';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-procedure-instruction',
  templateUrl: './procedure-instruction.component.html',
  styleUrls: ['./procedure-instruction.component.scss']
})
export class ProcedureInstructionComponent implements OnInit {
breadCrumbItems!: Array<{}>;
procedureReq: InstructionModel;
procedures: Procedure[]
currentExaminer: ExaminerAccount
procedureName: string = ''

  constructor(private instructionService: InstructionService,
     private examinerAccountService: ExaminerAccountService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Examiner' },
      { label: 'View Procedure instruction', active: true },
    ];
    this.getCurrentExaminer();
    this.getAllProcedures(this.currentExaminer.programId)
 
  }

  getProcedureReq(procedureId: string):Subscription{
    return this.instructionService.getProcedureReq(procedureId).subscribe(
      { next: ( data: InstructionModel)=>{
        this.procedureReq = data
      },
      complete: ()=>{
        console.log(this.procedureReq)
      }
    }
    )
  }

  getAllProcedures( programId: string): Subscription{
    return this.instructionService.getProcedures(programId).subscribe(
      {next : (data: Procedure[])=>{
        this.procedures = data
      },
      complete:() =>{
        console.log(this.procedures)
      },
      error:(err:HttpErrorResponse)=> {
        console.log(err.error.message)
      },
    }
    )
  }

  captureProcedure(procedureId: string){

    this.getProcedureReq(procedureId)
   
  }
  
  getCurrentExaminer(){
   this.currentExaminer = this.examinerAccountService.getUser()
  }

}
