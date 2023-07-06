import { Component, OnInit } from "@angular/core";
import { ManageVivaService } from "../services/manage-viva.service";
import { ManageOsceService } from "../services/manage-osce.service";
import { AvailableExamModel } from "../models/available-exam.model";
import { Subscription } from "rxjs";
import { VivaModel } from "../models/viva.model";
import { HttpErrorResponse } from "@angular/common/http";
import { StartExam } from "../models/exam.model";
import { ManagerAccountService } from "src/app/authentication/services/manager-account.service";
import { UtilitiesService } from "../services/utilities.service";
import { ManageResearchService } from "../services/manage-research.service";
import { ManageExpectantCareService } from "../services/manage-expectant-care.service";

@Component({
  selector: "app-start-exam",
  templateUrl: "./start-exam.component.html",
  styleUrls: ["./start-exam.component.scss"],
})
export class StartExamComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  osceData: AvailableExamModel = null;
  vivaData: VivaModel = null;
  researchData: AvailableExamModel = null;
  expectantCareData: AvailableExamModel = null;

  isVivaOn: StartExam;
  isOsceOn: StartExam;
  isResearchOn: StartExam;
  isExpectantCareOn: StartExam;

  isOsceAvailable: boolean = false;
  isVivaAvailable: boolean = false;
  isResearchAvailable: boolean = false;
  isExpectantCareAvailable: boolean = false;

  showVivaError = false;
  showOsceError = false;
  showExpectantCareError = false;
  showResearchError = false;

  vivaErrorMessage: string;
  osceErrorMessage: string;
  researchErrorMessage: string;
  expectantCareErrorMessage: string;

  startVivaErrorMessage: string;
  startOsceErrorMessage: string;
  startResearchErrorMessage: string;
  startExpectantCareErrorMessage: string;

  showStartVivaErrorMessage = false;
  showStartResearchErrorMessage = false;
  showStartExpectantCareErrorMessage = false;
  showStartOsceErrorMessage = false;

  constructor(
    private vivaService: ManageVivaService,
    private osceService: ManageOsceService,
    private researchService: ManageResearchService,
    private expectantCareService: ManageExpectantCareService,
    private managerAccountService: ManagerAccountService,
    private utilService: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Manager" },
      { label: "Start exam", active: true },
    ];
    this.getAvailableOsce();
    this.getAvailableViva();
    this.getAvailableResearch();
    this.getAvailableExpectantCare();
  }

  public getOsceStarted(): boolean {
    return this.utilService.osceStarted;
  }

  public getVivaStarted(): boolean {
    return this.utilService.vivaStarted;
  }
  public getResearchStarted(): boolean {
    return this.utilService.researchStarted;
  }
  public getExpectantCareStarted(): boolean {
    return this.utilService.expectantCareStarted;
  }

  getAvailableOsce() {
    this.osceService.getAvailableOsce().subscribe({
      next: (data: AvailableExamModel) => {
        this.osceData = data;
        this.isOsceAvailable = true;
        this.managerAccountService.setExamId(data.id);
      },
      error: (err: HttpErrorResponse) => {
        this.showOsceError = true;
        this.osceErrorMessage = err.error.message;
      },
      complete: () => {
        if (this.osceData.startedDate != null) {
          this.utilService.osceStarted = true;
          this.isOsceOn = {
            examId: this.osceData.id,
            started: true,
          };
        }
      },
    });
  }

  getAvailableResearch() {
    this.researchService.getAvailableResearch().subscribe({
      next: (data: AvailableExamModel) => {
        this.researchData = data;
        this.isResearchAvailable = true;
        this.managerAccountService.setExamId(data.id);
      },
      complete: () => {
        if (this.researchData.startedDate != null) {
          this.utilService.researchStarted = true;
          this.isResearchOn = {
            examId: this.researchData.id,
            started: true,
          };
        }
      },
      error: (err: HttpErrorResponse) => {
        this.showResearchError = true;
        this.researchErrorMessage = err.error.message;
      },
    });
  }

  getAvailableExpectantCare() {
    this.expectantCareService.getAvailableExpectantCare().subscribe({
      next: (data: AvailableExamModel) => {
        this.expectantCareData = data;
        this.isExpectantCareAvailable = true;
        this.managerAccountService.setExamId(data.id);
      },
      complete: () => {
        if (this.expectantCareData.startedDate != null) {
          this.utilService.expectantCareStarted = true;
          this.isExpectantCareOn = {
            examId: this.expectantCareData.id,
            started: true,
          };
        }
      },
      error: (err: HttpErrorResponse) => {
        this.showExpectantCareError = true;
        this.expectantCareErrorMessage = err.error.message;
      },
    });
  }

  getAvailableViva() {
    this.vivaService.getAvailableViva().subscribe({
      next: (data: VivaModel) => {
        this.vivaData = data;
        this.isVivaAvailable = true;
        this.managerAccountService.setExamId(data.id);
      },
      complete: () => {
        // console.log(this.vivaData);
        if (this.vivaData.startedDate != null) {
          this.utilService.vivaStarted = true;
          this.isVivaOn = {
            examId: this.vivaData.id,
            started: true,
          };
        }
      },
      error: (err: HttpErrorResponse) => {
        this.showVivaError = true;
        this.vivaErrorMessage = err.error.message;
      },
    });
  }

  startVivaExam(examId: string) {
    this.vivaService.startViva(examId).subscribe({
      next: (data: StartExam) => {
        this.isVivaOn = data;
      },
      complete: () => {
        // console.log(this.isVivaOn);
        this.utilService.vivaStarted = true;
        // this.managerAccountService.setExamId(this.isVivaOn.examId)
      },
      error: (err: HttpErrorResponse) => {
        this.startVivaErrorMessage = err.error.message;
        this.showStartVivaErrorMessage = true;
        console.log(err.error.message);
      },
    });
  }

  startResearch(examId: string) {
    this.researchService.startResearch(examId).subscribe({
      next: (data: StartExam) => {
        this.isResearchOn = data;
      },
      complete: () => {
        // console.log(this.isResearchOn);
        this.utilService.researchStarted = true;
        // this.managerAccountService.setExamId(this.isVivaOn.examId)
      },
      error: (err: HttpErrorResponse) => {
        this.startResearchErrorMessage = err.error.message;
        this.showStartResearchErrorMessage = true;
        console.log(err.error.message);
      },
    });
  }

  startExpectantCare(examId: string) {
    this.expectantCareService.startExpectantCare(examId).subscribe({
      next: (data: StartExam) => {
        this.isExpectantCareOn = data;
      },
      complete: () => {
        // console.log(this.isExpectantCareOn);
        this.utilService.expectantCareStarted = true;
        // this.managerAccountService.setExamId(this.isVivaOn.examId)
      },
      error: (err: HttpErrorResponse) => {
        this.startExpectantCareErrorMessage = err.error.message;
        this.showStartExpectantCareErrorMessage = true;
        console.log(err.error.message);
      },
    });
  }

  startOsceExam(examId: string) {
    this.osceService.startOsce(examId).subscribe({
      next: (data: StartExam) => {
        this.isOsceOn = data;
        this.utilService.osceStarted = true;
      },
      error: (err: HttpErrorResponse) => {
        this.startOsceErrorMessage = err.error.message;
        this.showStartOsceErrorMessage = true;
      },
      complete: () => {
        // this.managerAccountService.setExamId(this.isOsceOn.examId)
      },
    });
  }
}
