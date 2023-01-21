import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ManagerAccount } from "src/app/authentication/model/manager-account";
import { ManagerAccountService } from "src/app/authentication/services/manager-account.service";
import {
  CandidateModel,
  VivaMonitorModel,
} from "../../models/viva-monitor.model";
import { MonitorVivaService } from "../../services/monitor-viva.service";
import { ManageVivaService } from "../../services/manage-viva.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-viva",
  templateUrl: "./viva.component.html",
  styleUrls: ["./viva.component.scss"],
})
export class VivaComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  vivaMonitor: VivaMonitorModel;
  vivaMonitorByProgram: CandidateModel[];
  currentManager: ManagerAccount;
  availableVivaToMonitor: any;

  constructor(
    private manageVivaService: ManageVivaService,
    private monitorVivaService: MonitorVivaService,
    private managerAccountService: ManagerAccountService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Manager" },
      { label: "Monitor VIVA", active: true },
    ];

    this.getAvailableVivaToMonitor();
    // this.monitorViva(this.currentManager)
  }

  monitorViva(examId: string): Subscription {
    return this.monitorVivaService.monitorViva(examId).subscribe({
      next: (data: VivaMonitorModel) => {
        this.vivaMonitor = data;
      },
    });
  }

  monitorByProgram(examId: string, programId: string): Subscription {
    return this.monitorVivaService
      .monitorVivaCandidatesByProgram(examId, programId)
      .subscribe({
        next: (data: CandidateModel[]) => {
          this.vivaMonitorByProgram = data;
        },
      });
  }

  getAvailableVivaToMonitor() {
    this.manageVivaService.getAvailableViva().subscribe({
      next: (data) => {
        this.availableVivaToMonitor = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      },
      complete() {
        console.log(this.availableVivaToMonitor);
      },
    });
  }
  getCurrentManager() {
    this.currentManager = this.managerAccountService.getUser();
  }
}
