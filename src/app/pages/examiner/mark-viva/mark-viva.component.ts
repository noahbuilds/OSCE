import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CandidateModel } from '../models/candidate.model';
import { VivaModel } from '../models/viva.model';
import { MarkVivaService } from '../services/mark-viva.service';
import { ExaminerAccount } from 'src/app/authentication/model/examiner-account';
import { ExaminerAccountService } from 'src/app/authentication/services/examiner-account.service';
import { ResourceCreated } from '../../exam-manager/models/resource.created';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-mark-viva',
  templateUrl: './mark-viva.component.html',
  styleUrls: ['./mark-viva.component.scss']
})
export class MarkVivaComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  candidateToGrade: CandidateModel;
  gradedCandidatesByProgram: CandidateModel[]
  currentExaminerData: ExaminerAccount
  resourceCreated : ResourceCreated


  constructor( private modalService: NgbModal, private markVivaService: MarkVivaService, private examinerAccountService: ExaminerAccountService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Examiner' },
      { label: 'Mark VIVA', active: true },
    ];

    this.currentExaminerData =this.examinerAccountService.getUser()
    this.getGradedCandidatesByProgram(this.currentExaminerData.programId)

  }
  openMarkingGuide(content: any) {
    this.modalService.open(content, { size: 'md', centered: true });
  }
  openGrader(content:any, candidateExamNumber: string){

    // if(candidateExamNumber == ""){

    // }
    this.getCandidateForGrading(candidateExamNumber, this.currentExaminerData.programId)
    this.modalService.open(content, { size: 'md', centered: true })
  }

  cancel(){
    this.modalService.dismissAll()
  }

  getCandidateForGrading(examNumber: string, programId:string):Subscription{
    return this.markVivaService.getCandidateForGrading(examNumber, programId).subscribe({
      next: (data:CandidateModel)=>{
        this.candidateToGrade =data
      },
      // complete: ()=>{

      // }
    })
  }

  getGradedCandidatesByProgram(programId: string):Subscription{
    return this.markVivaService.getGradedCandidatesByProgram(programId).subscribe(
      {next: (data: CandidateModel[])=>{
        this.gradedCandidatesByProgram = data
      }}
    )
  }

  gradeCandidate(candidateId: string, grade:string){

    let payload = {
      candidateId: candidateId,
  score: parseFloat(grade),
  examinerId: this.currentExaminerData.id,
  programId: this.currentExaminerData.programId,
  examId: this.currentExaminerData.examId,
    }
    this.markVivaService.gradeCandidate( candidateId, payload).subscribe(
      {
        next : (data: ResourceCreated)=>{
          this.resourceCreated =data
          this.getGradedCandidatesByProgram(payload.programId)
        },
        error: (err: HttpErrorResponse)=>{
          console.log(err.error.message)
        }
      }
    )
  }
}
