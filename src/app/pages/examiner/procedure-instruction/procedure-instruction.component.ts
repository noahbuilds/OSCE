import { Component, OnInit } from '@angular/core';
import { InstructionModel } from '../models/instruction.model';
import { InstructionService } from '../services/instruction.service';


@Component({
  selector: 'app-procedure-instruction',
  templateUrl: './procedure-instruction.component.html',
  styleUrls: ['./procedure-instruction.component.scss']
})
export class ProcedureInstructionComponent implements OnInit {
breadCrumbItems!: Array<{}>;
procedureReq: InstructionModel
  constructor(private instructionService: InstructionService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Examiner' },
      { label: 'View Procedure instruction', active: true },
    ];
  }

  getProcedureReq(procedureId: string){
    this.instructionService.getProcedureReq(procedureId).subscribe(
      { next: ( data: InstructionModel)=>{
        this.procedureReq = data
      }}
    )
  }

}
