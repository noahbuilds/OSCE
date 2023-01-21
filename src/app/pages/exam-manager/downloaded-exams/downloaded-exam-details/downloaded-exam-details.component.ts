import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  Subscription } from 'rxjs';
import { ExaminerModel, ProcedureModel, ExaminerProcedureModel } from '../../models/examiner.model';
import { ResourceCreated } from '../../models/resource.created';
import { ExamService } from '../../services/exam.service';


@Component({
  selector: 'app-downloaded-exam-details',
  templateUrl: './downloaded-exam-details.component.html',
  styleUrls: ['./downloaded-exam-details.component.scss']
})
export class DownloadedExamDetailsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  examiners: ExaminerModel[]
  routeSub: Subscription
  examinerSub: Subscription
  examId: string;
  programId: string
  programName: string
  procedures: ProcedureModel[]
  payload: ExaminerProcedureModel
  procedureAdded: ResourceCreated


  constructor(private ngbModalService: NgbModal, private examService: ExamService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Downloaded Exams', active: true },
      { label: 'Details', active: true },
    ];
    
    this.routeSub = this.activatedRoute.params.subscribe((params: Params)=>{
      this.examId = params['examId'];
      this.programId = params['programId'];
      this.programName = params['programName']
      this.getExaminersForAnExam(this.examId, this.programId)
      
    })
  }

  openAddProcedureModal(content: any){
    this.ngbModalService.open(content, { size: 'md', centered: true})
    this.getProcedures(this.examId, this.programId)
    
  }

  getExaminersForAnExam(examId:string, programId: string): Subscription{
    return  this.examinerSub= this.examService.getExaminersForAnExam(examId, programId).subscribe({
      next: (data: ExaminerModel[])=>{
        this.examiners =data
      },
      error: (err: HttpErrorResponse)=>{
        console.log(err.message)
      },
      complete: ()=>{
        console.log(this.examiners)
      }
      
    })
  
  }

  getProcedures(examId:string, programId: string): Subscription{
    return this.examService.getProcedures(examId, programId).subscribe({
      next: (data: ProcedureModel[])=>{
        this.procedures = data
      },
      complete: ()=>{
        console.log(this.procedures)
      }

    })
  }

  captureProcedureToAddToExaminer(examinerId:string, value:string){
    this.payload= {
      examId: this.examId,
      examinerId: examinerId,
      procedureId: value,
      programId: this.programId
    }
    
    // console.log({
    //   examinerId: examinerId,
     
    //   value: value
    // })

  }

  addProcedureToExaminer():Subscription{
    return this.examService.addProcedureToExaminer(this.payload).subscribe({
      next : (data: ResourceCreated)=>{
        this.procedureAdded = data
      },
      error: (err: HttpErrorResponse)=>{
        console.log(err.error.message)
        console.log(this.router.url)
        


      },
      complete: ()=> {
       
        console.log(this.procedureAdded)
        console.log(this.router.url)
        this.getExaminersForAnExam(this.examId, this.programId)
      }
    })
  }

  ngOnDestroy(): void {
    // this.routeSub.unsubscribe()
    // this.examinerSub.unsubscribe()
  }
}
