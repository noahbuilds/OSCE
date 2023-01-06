import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-exam',
  templateUrl: './download-exam.component.html',
  styleUrls: ['./download-exam.component.scss']
})
export class DownloadExamComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Download Exam', active: true },
    ];
  }

}
