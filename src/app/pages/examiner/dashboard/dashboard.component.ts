import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Examiner' },
      { label: 'Dashboard', active: true },
    ];
  }

}
