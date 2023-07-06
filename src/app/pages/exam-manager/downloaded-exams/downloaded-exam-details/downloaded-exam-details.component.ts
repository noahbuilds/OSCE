import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotifierService } from "angular-notifier";
import { Subscription } from "rxjs";
import {
  ExaminerModel,
  ProcedureModel,
  ExaminerProcedureModel,
} from "../../models/examiner.model";
import { ResourceCreated } from "../../models/resource.created";
import { ExamService } from "../../services/exam.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-downloaded-exam-details",
  templateUrl: "./downloaded-exam-details.component.html",
  styleUrls: ["./downloaded-exam-details.component.scss"],
})
export class DownloadedExamDetailsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  examiners: ExaminerModel[];
  routeSub: Subscription;
  examinerSub: Subscription;
  examId: string;
  programId: string;
  programName: string;
  procedures: ProcedureModel[];
  payload: ExaminerProcedureModel;
  procedureAdded: ResourceCreated;

  constructor(
    private ngbModalService: NgbModal,
    private examService: ExamService,
    private activatedRoute: ActivatedRoute,
    private readonly notifier: NotifierService,
    private router: Router,
    private locationService: Location
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Manager" },
      { label: "Downloaded Exams", active: true },
      { label: "Details", active: true },
    ];

    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.examId = params["examId"];
      this.programId = params["programId"];
      this.programName = params["programName"];
      this.getExaminersForAnExam(this.examId, this.programId);
    });
  }

  openAddProcedureModal(content: any) {
    this.ngbModalService.open(content, { size: "md", centered: true });
    this.getProcedures(this.examId, this.programId);
  }

  closeModal() {
    this.ngbModalService.dismissAll();
  }

  getExaminersForAnExam(examId: string, programId: string) {
    this.examinerSub = this.examService
      .getExaminersForAnExam(examId, programId)
      .subscribe({
        next: (data: ExaminerModel[]) => {
          this.examiners = data;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
        },
        complete: () => {
          // console.log(this.examiners);
        },
      });
  }

  getProcedures(examId: string, programId: string) {
    this.examService.getProcedures(examId, programId).subscribe({
      next: (data: ProcedureModel[]) => {
        this.procedures = data;
      },
      complete: () => {
        // console.log(this.procedures);
      },
    });
  }

  captureProcedureToAddToExaminer(examinerId: string, value: string) {
    this.payload = {
      examId: this.examId,
      examinerId: examinerId,
      procedureId: value,
      programId: this.programId,
    };
  }

  addProcedureToExaminer() {
    this.examService.addProcedureToExaminer(this.payload).subscribe({
      next: (data: ResourceCreated) => {
        this.procedureAdded = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
        if (this.payload.procedureId == null) {
          this.notifier.notify("error", `Please select a procedure`);

          return;
        }
        this.notifier.notify("error", err.error.message);
        this.closeModal();
      },
      complete: () => {
        // console.log(this.procedureAdded);
        this.notifier.notify("success", "Procedure added");
        this.closeModal();
        this.payload.procedureId = null;
        this.getExaminersForAnExam(this.examId, this.programId);
      },
    });
  }

  updateExaminerStatus(examinerId: string, active: boolean) {
    this.examService.updateExaminerStatus(examinerId, active).subscribe({
      next: (data) => {},
      error: (err: HttpErrorResponse) => {
        this.notifier.notify('error', err.error.message);
      },
      complete: () => {
        this.notifier.notify("success", "Examiner status updated successfuly");
        this.getExaminersForAnExam(this.examId, this.programId);
      },
    });
  }

  getValue(event: any, examinerId: string) {
    //  console.log(inputRef)
    console.log(event.target.checked);

    this.updateExaminerStatus(examinerId, event.target.checked);
  }

  goBack() {
    this.locationService.back();
  }

  ngOnDestroy(): void {
    // this.routeSub.unsubscribe()
    // this.examinerSub.unsubscribe()
  }
}
