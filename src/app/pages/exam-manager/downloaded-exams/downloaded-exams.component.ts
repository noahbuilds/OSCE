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
  }

  viewDetails(){
    this.router.navigate(['manager/downloaded-exams/details'])
  }
   getDownloadedExams():Subscription{
    return this.examService.getDownloadedExams().subscribe({
      next: (data: ExamModel[])=>{
        this.downloadedExams = data
      }
    })
   }
}
