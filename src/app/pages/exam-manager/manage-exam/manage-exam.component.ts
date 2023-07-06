import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProgramModel } from "../models/program.model";
import { ManageExamService } from "../services/manage-exam.service";
import { NotifierService } from "angular-notifier";
import { Subscription } from "rxjs";
import { ManagerAccountService } from "src/app/authentication/services/manager-account.service";
import { ManagerAccount } from "src/app/authentication/model/manager-account";
import { StartExamComponent } from "../start-exam/start-exam.component";
import { UtilitiesService } from "../services/utilities.service";
import { ManageOsceService } from "../services/manage-osce.service";
import { ManageVivaService } from "../services/manage-viva.service";
import { ResourceCreated } from "../models/resource.created";
import { ManageExpectantCareService } from "../services/manage-expectant-care.service";
import { ManageResearchService } from "../services/manage-research.service";
import { ReloginService } from "../services/relogin.service";

@Component({
  selector: "app-manage-exam",
  templateUrl: "./manage-exam.component.html",
  styleUrls: ["./manage-exam.component.scss"],
})
export class ManageExamComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  programList: Array<ProgramModel>;
  currentManager: ManagerAccount;
  programIDForCandidateSync: string;
  programIDForExaminerSync: string;

  processingSynchronizeCandidate: boolean = false;
  processingSynchronizeExaminer: boolean = false;
  processingSynchronizeProgram: boolean = false;
  processingEndOsce: boolean = false;
  processingEndViva: boolean = false;
  processingEndExpectantCare: boolean = false;
  processingEndResearch: boolean = false;
  processingRelogin: boolean = false;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private manageExamService: ManageExamService,
    private readonly notifier: NotifierService,
    private managerAccountService: ManagerAccountService,
    private utilitiesService: UtilitiesService,
    private manageOsceService: ManageOsceService,
    private manageVivaService: ManageVivaService,
    private manageExpectantCareService: ManageExpectantCareService,
    private manageResearchService: ManageResearchService,
    private reloginService: ReloginService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Manager" },
      { label: "Manage exam", active: true },
    ];
    this.currentManager = this.managerAccountService.getUser();

    //  console.log(this.currentManager)
  }

  isOsceOn(): boolean {
    return this.utilitiesService.osceStarted;
  }

  isVivaOn(): boolean {
    return this.utilitiesService.vivaStarted;
  }

  endOsce() {
    this.processingEndOsce = true;
    this.manageOsceService.endOsce(this.currentManager.examId).subscribe({
      next: (value) => {
        this.notifier.notify("success", "OSCE ended Successfully");

        this.processingEndOsce = false;
      },
      error: (err: HttpErrorResponse) => {
        this.notifier.notify("error", err.error.message);
        this.processingEndOsce = false;
      },
    });
  }
  endViva() {
    this.processingEndViva = true;
    this.manageVivaService.endViva(this.currentManager.examId).subscribe({
      next: (value) => {
        this.notifier.notify("success", "VIVA ended Successfully");

        this.processingEndViva = false;
      },
      error: (err: HttpErrorResponse) => {
        this.notifier.notify("error", err.error.message);
        this.processingEndViva = false;
      },
    });
  }
  endResearch() {
    this.processingEndResearch = true;
    this.manageResearchService
      .endResearch(this.currentManager.examId)
      .subscribe({
        next: (value) => {
          this.notifier.notify("success", "RESEARCH ended Successfully");
          this.processingEndResearch = false;
        },
        error: (err: HttpErrorResponse) => {
          this.notifier.notify("error", err.error.message);
          this.processingEndResearch = false;
        },
      });
  }

  endExpectantCare() {
    this.processingEndExpectantCare = true;
    this.manageExpectantCareService
      .endExpectantCare(this.currentManager.examId)
      .subscribe({
        next: (value) => {
          this.notifier.notify(
            "success",
            "EXPECTANT CARE / CLIENT CARE ended Successfully"
          );

          this.processingEndExpectantCare = false;
        },
        error: (err: HttpErrorResponse) => {
          this.notifier.notify("error", err.error.message);
          this.processingEndExpectantCare = false;
        },
      });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  openSynchronizeCandidateModal(content: any) {
    this.getPrograms(this.currentManager.examId);
    this.modalService.open(content, { size: "md", centered: true });
  }

  openEndOsceConfirmationModal(content: any) {
    this.modalService.open(content, { size: "md", centered: true });
  }
  openEndResearchConfirmationModal(content: any) {
    this.modalService.open(content, { size: "md", centered: true });
  }
  openEndExpectantCareConfirmationModal(content: any) {
    this.modalService.open(content, { size: "md", centered: true });
  }

  openEndVivaConfirmationModal(content: any) {
    this.modalService.open(content, { size: "md", centered: true });
  }

  openAllowReloginModal(content: any) {
    this.modalService.open(content, { size: "md", centered: true });
  }

  openSynchronizeExaminerModal(content: any) {
    this.getPrograms(this.currentManager.examId);
    this.modalService.open(content, { size: "md", centered: true });
  }

  getPrograms(examId: string) {
    this.manageExamService.getPrograms(examId).subscribe({
      next: (data: ProgramModel[]) => {
        this.programList = data;
      },
      error: (err: HttpErrorResponse) => {
        this.notifier.notify("error", err.error.message);
      },
      complete: () => {},
    });
  }

  synchronizePrograms(examId: string) {
    this.processingSynchronizeProgram = true;
    this.manageExamService.synchronizePrograms(examId).subscribe({
      next: (value: ProgramModel[]) => {
        this.notifier.notify(
          "success",
          `${value.length} Program(s) Added Successfully`
        );
        this.processingSynchronizeProgram = false;
      },
      error: (err: HttpErrorResponse) => {
        this.notifier.notify("error", err.error.message);
        this.processingSynchronizeProgram = false;
      },
    });
  }

  captureProgramForCandidate(capturedProgramId: string) {
    this.programIDForCandidateSync = capturedProgramId;
  }

  captureProgramForExaminer(capturedProgramId: string) {
    this.programIDForExaminerSync = capturedProgramId;
  }

  synchronizeExaminers() {
    if (this.programIDForExaminerSync == null) {
      this.notifier.notify("error", "Please select a program");

      return;
    }
    this.processingSynchronizeExaminer = true;
    this.manageExamService
      .synchronizeExaminers(
        this.currentManager.examId,
        this.programIDForExaminerSync
      )
      .subscribe({
        next: (value) => {
          this.notifier.notify("success", value.id);
          this.programIDForExaminerSync = null;
          this.processingSynchronizeExaminer = false;
          this.closeModal();
        },
        error: (err: HttpErrorResponse) => {
          this.notifier.notify("error", err.error.message);
          this.programIDForExaminerSync = null;
          this.processingSynchronizeExaminer = false;
          this.closeModal();
        },
        complete: () => {},
      });
  }

  synchronizeCandidates() {
    if (this.programIDForCandidateSync == null) {
      this.notifier.notify("error", "Please select a program");

      return;
    }

    this.processingSynchronizeCandidate = true;
    this.manageExamService
      .synchronizeCandidates(
        this.currentManager.examId,
        this.programIDForCandidateSync
      )
      .subscribe({
        next: (value: ResourceCreated) => {
          this.notifier.notify("success", `${value.id}`);
          this.programIDForCandidateSync = null;
          this.processingSynchronizeCandidate = false;
          this.closeModal();
        },
        error: (err: HttpErrorResponse) => {
          this.notifier.notify("error", err.error.message);
          this.programIDForCandidateSync = null;
          this.processingSynchronizeCandidate = false;
          this.closeModal();
        },
        complete: () => {
          // this.notifier.notify("success", "Succefully Synchronized Candidates");
        },
      });
  }

  allowRelogin(examNumber: string) {
    this.processingRelogin = true;
    if (examNumber == "") {
      this.notifier.notify("error", "Please enter exam number");
      this.processingRelogin = false;

      return;
    }
    let payload = {
      examNumber: examNumber,
    };
    this.reloginService
      .allowRelogin(this.currentManager.examId, payload)
      .subscribe({
        next: (value) => {
          this.notifier.notify("success", `successfully relogin ${examNumber}`);
          this.processingRelogin = false;
          this.closeModal();
        },
        error: (err: HttpErrorResponse) => {
          this.notifier.notify("error", err.error.message);
          this.processingRelogin = false;
        },
      });
  }
}
