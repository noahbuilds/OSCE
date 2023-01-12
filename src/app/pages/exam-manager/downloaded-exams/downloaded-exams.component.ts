import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Downloaded Exams', active: true },
    ];
  }

  viewDetails(){
    this.router.navigate(['manager/downloaded-exams/details'])
  }

}
