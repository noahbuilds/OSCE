import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
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
  dashboardData: DashboardModel;
  dashboardSub: Subscription;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Manager" },
      { label: "Dashboard", active: true },
    ];
    this.setGreetMsg();
    this.getDashboardData();
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

  getDashboardData(): Subscription {
    return (this.dashboardSub = this.dashboardService
      .getDashboardData()
      .subscribe({
        next: (data: DashboardModel) => {
          this.dashboardData = data;
        },
        // error: (err:HttpErrorResponse)=>{
        //   console.log(err.message)
        // }
        
      }));
  }

  ngOnDestroy(): void {
    this.dashboardSub.unsubscribe();
  }
}
