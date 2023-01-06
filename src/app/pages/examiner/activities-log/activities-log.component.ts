import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audit-log',
  templateUrl: './activities-log.component.html',
  styleUrls: ['./activities-log.component.scss']
})
export class ActivitiesLogComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Examiner' },
      { label: 'Activities logs', active: true },
    ];
  }

}
