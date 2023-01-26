import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExamModel } from '../models/exam.model';
import { ExamService } from '../services/exam.service';
import { ManageExamService } from '../services/manage-exam.service';
import { NotifierService } from 'angular-notifier';
import { ManagerAccountService } from 'src/app/authentication/services/manager-account.service';


@Component({
  selector: 'app-downloaded-exams',
  templateUrl: './downloaded-exams.component.html',
  styleUrls: ['./downloaded-exams.component.scss']
})
export class DownloadedExamsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  downloadedExams: ExamModel[]
  constructor(private router: Router, 
    private examService: ExamService,
     private manageExamService: ManageExamService,
     private readonly notifierService: NotifierService,
     private managerAccountService: ManagerAccountService
     ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Downloaded Exams', active: true },
    ];
    this.getDownloadedExams();
  }

  viewExaminers(examId:string, programId:string, programName:string){
    this.router.navigate(['manager/downloaded-exams/details',programName, examId,programId])
  }

   getDownloadedExams():Subscription{
    return this.examService.getDownloadedExams().subscribe({
      next: (data: ExamModel[])=>{
        this.downloadedExams = data
        console.log(this.downloadedExams)
      }
    })

   
   }

   uploadOsce(): Subscription{
    return this.manageExamService.uploadOsce(this.managerAccountService.getUser().examId).subscribe(
      {
        next: (value)=> {
          
        },
        error: (err: HttpErrorResponse)=> {
          this.notifierService.notify('error', err.error.message)
          
        },
        complete:() =>{
            this.notifierService.notify('success', 'OSCE uploaded successfully')
        },
      }
    )
   }

   uploadViva(): Subscription{
    return this.manageExamService.uploadViva(this.managerAccountService.getUser().examId).subscribe(
      { next:(value)=> {
        
      },
      error: (err: HttpErrorResponse)=> {
        console.log(err.error.message)
        this.notifierService.notify('error', err.error.message)

      },
      complete: ()=> {
        this.notifierService.notify('success', 'VIVA uploaded successfully')
      },
    }
    )
   }
}
