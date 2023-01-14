import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import {
  CandidateModel,
  VivaMonitorModel,
} from "../../models/viva-monitor.model";
import { MonitorVivaService } from "../../services/monitor-viva.service";

@Component({
  selector: "app-viva",
  templateUrl: "./viva.component.html",
  styleUrls: ["./viva.component.scss"],
})
export class VivaComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  viva: Array<any> = [{}, {}, {}, {}, {}, {}];
  vivaMonitor: VivaMonitorModel;
  vivaMonitorByProgram: CandidateModel[];
  constructor(private monitorVivaService: MonitorVivaService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Manager" },
      { label: "Monitor VIVA", active: true },
    ];
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
}
