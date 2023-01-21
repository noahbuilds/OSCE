import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExamModel } from '../models/exam.model';
import { ExamService } from '../services/exam.service';



@Component({
  selector: 'app-downloaded-exams',
  templateUrl: './downloaded-exams.component.html',
  styleUrls: ['./downloaded-exams.component.scss']
})
export class DownloadedExamsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  items: any = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]
  downloadedExams: ExamModel[]
  constructor(private router: Router, private examService: ExamService) { }

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
}
