import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExamModel } from '../models/exam.model';

import { ExamService } from '../services/exam.service';

@Component({
  selector: 'app-download-exam',
  templateUrl: './download-exam.component.html',
  styleUrls: ['./download-exam.component.scss']
})
export class DownloadExamComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  showDetails: boolean = false
  downloadedExam: ExamModel

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
  
  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Download Exam', active: true },
    ];
  }

  showProgramDetails():boolean{
    return this.showDetails = !this.showDetails
  }

  downloadExam(centerId): Subscription{
   return  this.examService.downloadExam(centerId).subscribe(
      {next: (data: ExamModel)=>{
        this.downloadedExam = data
      }}
    )
  }
}
