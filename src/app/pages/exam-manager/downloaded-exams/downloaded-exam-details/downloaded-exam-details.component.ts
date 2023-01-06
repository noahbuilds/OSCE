import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-downloaded-exam-details',
  templateUrl: './downloaded-exam-details.component.html',
  styleUrls: ['./downloaded-exam-details.component.scss']
})
export class DownloadedExamDetailsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Downloaded Exams', active: true },
      { label: 'Details', active: true },
    ];
  }

}
