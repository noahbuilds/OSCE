import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CandidateModel } from '../models/candidate.model';
import { VivaModel } from '../models/viva.model';
import { MarkVivaService } from '../services/mark-viva.service';

@Component({
  selector: 'app-mark-viva',
  templateUrl: './mark-viva.component.html',
  styleUrls: ['./mark-viva.component.scss']
})
export class MarkVivaComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  candidateTograde: CandidateModel;
  gradedCandidatesByProgram: CandidateModel[]
  constructor( private modalService: NgbModal, private markVivaService: MarkVivaService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Examiner' },
      { label: 'Mark VIVA', active: true },
    ];
  }
  openMarkingGuide(content: any) {
    this.modalService.open(content, { size: 'md', centered: true });
  }
  openGrader(content:any){
    this.modalService.open(content, { size: 'md', centered: true })
  }

  cancel(){
    this.modalService.dismissAll()
  }

  getCandidateForGrading(examNumber: string, programId:string){
    this.markVivaService.getCandidateForGrading(examNumber, programId).subscribe({
      next: (data:CandidateModel)=>{
        this.candidateTograde =data
      }
    })
  }

  getGradedCandidatesByProgram(programId: string){
    this.markVivaService.getGradedCandidatesByProgram(programId).subscribe(
      {next: (data: CandidateModel[])=>{
        this.gradedCandidatesByProgram = data
      }}
    )
  }

  gradeCandidate(candidateId: string, grade:VivaModel){
    this.markVivaService.gradeCandidate( candidateId, grade)
  }
}
