import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardModel } from '../models/dashboard.model';
import { DashboardService } from '../services/dashboard.service';
import { ExaminerAccountService } from 'src/app/authentication/services/examiner-account.service';
import { ExaminerAccount } from 'src/app/authentication/model/examiner-account';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  dashboardData: DashboardModel
  currentExaminerData: ExaminerAccount

  items: Array<any> = [

    {
     
    },
    {
      
    },
    {
      
    },
    {
      
    },
    {
      
    },
    {
      
    }
  ]

  constructor(private dashboardService: DashboardService,
     private examinerAccountService: ExaminerAccountService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Examiner' },
      { label: 'Dashboard', active: true },
    ];
    this.getExaminerData()
    // console.log(this.currentExaminerData)
    this.getDashboardData(this.currentExaminerData.programId)
  }
getDashboardData(programId:string){
   this.dashboardService.getDashboardData(programId).subscribe({
    next: (data:DashboardModel)=>{
      this.dashboardData =data
    },
    complete: ()=>{
      // console.log(this.dashboardData)
    }
  })
}

getExaminerData(): ExaminerAccount{
 this.currentExaminerData = this.examinerAccountService.getUser()
 return this.currentExaminerData
}
}
