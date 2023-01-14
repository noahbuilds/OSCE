import { Component, OnInit } from '@angular/core';
import { InstructionModel } from '../models/instruction.model';
import { InstructionService } from '../services/instruction.service';

@Component({
  selector: 'app-candidate-instruction',
  templateUrl: './candidate-instruction.component.html',
  styleUrls: ['./candidate-instruction.component.scss']
})
export class CandidateInstructionComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  candidateInstruction: InstructionModel
  constructor(private instructionService: InstructionService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Examiner' },
      { label: 'Candidate instruction', active: true },
    ];
  }

  getCandidateInstruction(procedureId: string){
    this.instructionService.getCandidateInstruction(procedureId).subscribe(
      { next: (data:InstructionModel)=>{
        this.candidateInstruction =data
      } }
    )
  }

}
