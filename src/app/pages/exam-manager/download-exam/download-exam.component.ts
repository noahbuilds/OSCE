import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExamModel } from '../models/exam.model';

import { ExamService } from '../services/exam.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-download-exam',
  templateUrl: './download-exam.component.html',
  styleUrls: ['./download-exam.component.scss']
})
export class DownloadExamComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  downloadedExam: ExamModel;
  processingDownload : boolean = false


 
  
  constructor(private examService: ExamService, 
    private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Download Exam', active: true },
    ];
  }



  downloadExam(){
    this.processingDownload = true
     this.examService.downloadExam().subscribe(
      {
        next: (data: ExamModel)=>{
        this.downloadedExam = data;
        this.processingDownload = false
    
      },
      error:(err:HttpErrorResponse)=> {
        this.notifierService.notify('error', err.error.message);
        this.processingDownload = false
      },
    }
    )
  }
}
