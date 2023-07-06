import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Subscription, timer } from "rxjs";
import { ManagerAccountService } from "src/app/authentication/services/manager-account.service";
import { DashboardModel } from "../models/dashboard.model";
import { DashboardService } from "../services/dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  greetMsg: string = "";
  dashboardData: DashboardModel ;
  currentManager: string = '';
  refreshTimerSub$: Subscription;
  constructor(
    private dashboardService: DashboardService, 
    private managerAccountService: ManagerAccountService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Manager" },
      { label: "Dashboard", active: true },
    ];
    this.setGreetMsg();
   this.currentManager=  this.managerAccountService.getUser().username
    this.getDashboardData();
    this.refreshDashboard();
  }

  setGreetMsg(): string {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();

    if (hours >= 0 && hours <= 11 && minutes >= 0 && minutes <= 59) {
      return (this.greetMsg = "Good morning");
    }
    if (hours >= 12 && hours <= 15 && minutes >= 0 && minutes <= 59) {
      return (this.greetMsg = "Good afternoon");
    }
    if (hours >= 16 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      return (this.greetMsg = "Good evening");
    }
    return "";
  }

  getDashboardData() {
     this.dashboardService
      .getDashboardData()
      .subscribe({
        next: (data: DashboardModel) => {
          this.dashboardData = data;
        },
        error: (err:HttpErrorResponse)=>{
          console.log(err.message)
        }
        
      });
  }

refreshDashboard(){
  this.refreshTimerSub$ = timer(60000, 60000).subscribe((value)=>{
    this.getDashboardData()
  })
}


  ngOnDestroy(): void {
    if(this.refreshTimerSub$ != null){
      this.refreshTimerSub$.unsubscribe()
    }

  }
 
}
