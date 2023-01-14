import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardModel } from '../models/dashboard.model';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  dashboardData: DashboardModel

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Examiner' },
      { label: 'Dashboard', active: true },
    ];
  }
getDashboardData(programId:string):Subscription{
  return this.dashboardService.getDashboardData(programId).subscribe({
    next: (data:DashboardModel)=>{
      this.dashboardData =data
    }
  })
}
}
