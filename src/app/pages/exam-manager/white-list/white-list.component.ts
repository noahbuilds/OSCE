import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { Observable, Subscription } from "rxjs";
import { IpModel } from "../models/ip.model";
import { ResourceCreated } from "../models/resource.created";
import { IpService } from "../services/ip.service";

@Component({
  selector: "app-white-list",
  templateUrl: "./white-list.component.html",
  styleUrls: ["./white-list.component.scss"],
})
export class WhiteListComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  IPs: string[];
  payload: IpModel;
  resourceCreated: ResourceCreated;
  processingDeleteIP: boolean = false;
  processingAddIP: boolean = false;
  deleteIPIndex: number 
  constructor(
    private ipService: IpService,
    private readonly notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Manager" },
      { label: "White List", active: true },
    ];

    this.getIPs();
  }

  getIPs() {
    this.ipService.getIPs().subscribe({
      next: (data: string[]) => {
        this.IPs = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      },
    });
  }

  captureIP(ip: string) {
    this.payload = {
      ip: ip,
    };

    this.addIP(this.payload);
  }

  addIP(payload: IpModel) {
    this.processingAddIP = true;
    if (payload.ip == "") {
      this.notifierService.notify("error", `Please provide an IP address`);

      return;
    }
    this.ipService.addIP(payload).subscribe({
      next: (data: ResourceCreated) => {
        this.notifierService.notify(
          "success",
          `${payload.ip} added successfully`
        );
        this.getIPs();
        this.processingAddIP = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message);
        this.notifierService.notify("error", err.error.message);
        this.processingAddIP = false;
      },
    });
  }

  deleteIP(ip: string, index: number) {
    this.processingDeleteIP = true;
    this.deleteIPIndex = index
    this.ipService.deleteIP(ip).subscribe({
      next: (value) => {
        this.notifierService.notify("success", `${ip} deleted successfully`);
        this.getIPs();
        this.processingDeleteIP = false;
        this.deleteIPIndex = null
      },

      error: (err: HttpErrorResponse) => {
        this.notifierService.notify("error", err.error.message);
        this.processingDeleteIP = false;
        this.deleteIPIndex = null
      },
    });
  }

  ngOnDestroy(): void {
    this.processingAddIP = false;
    this.processingDeleteIP = false;
    this.deleteIPIndex = null
  }
}
