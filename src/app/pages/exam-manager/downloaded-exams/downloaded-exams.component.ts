import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-downloaded-exams',
  templateUrl: './downloaded-exams.component.html',
  styleUrls: ['./downloaded-exams.component.scss']
})
export class DownloadedExamsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Downloaded Exams', active: true },
    ];
  }

  viewExaminer(){
    this.router.navigate(['manager/downloaded-exams/details'])
  }

}
