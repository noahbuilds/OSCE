import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor-exam',
  templateUrl: './monitor-exam.component.html',
  styleUrls: ['./monitor-exam.component.scss']
})
export class MonitorExamComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Monitor exam', active: true },
    ];
  }

 

}
