import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monitor-exam',
  templateUrl: './monitor-exam.component.html',
  styleUrls: ['./monitor-exam.component.scss']
})
export class MonitorExamComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  examsToMonitor: Array<any>= [
    {name: "Expectant-care"},
    {name: "Objective-station"},
    {name: "VIVA"},
    {name: "Research"},
    {name: "OSCE"},
  ]
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Monitor exam', active: true },
    ];
  }

  monitor(examName){
    let examToMonitor = examName.toLowerCase()
    this.router.navigate(["manager/monitor-exam/"+examToMonitor])
  }

}
