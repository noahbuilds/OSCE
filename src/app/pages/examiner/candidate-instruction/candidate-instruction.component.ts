import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ExaminerAccount } from "src/app/authentication/model/examiner-account";
import { ExaminerAccountService } from "src/app/authentication/services/examiner-account.service";
import { InstructionModel } from "../models/instruction.model";
import { Procedure } from "../models/procedure.model";
import { InstructionService } from "../services/instruction.service";

@Component({
  selector: "app-candidate-instruction",
  templateUrl: "./candidate-instruction.component.html",
  styleUrls: ["./candidate-instruction.component.scss"],
})
export class CandidateInstructionComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  candidateInstruction: InstructionModel;
  currentExaminer: ExaminerAccount;
  procedures: Procedure[];
  constructor(
    private instructionService: InstructionService,
    private examinerAccountService: ExaminerAccountService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Examiner" },
      { label: "Candidate instruction", active: true },
    ];
    this.getCurrentExaminer();
    this.getAllProcedures(this.currentExaminer.programId);
  }

  getCandidateInstruction(procedureId: string): Subscription {
    return this.instructionService
      .getCandidateInstruction(procedureId)
      .subscribe({
        next: (data: InstructionModel) => {
          this.candidateInstruction = data;
        },
        complete: () => {
          console.log(this.candidateInstruction);
        },
        error(err: HttpErrorResponse) {
          console.log(err.error.message);
        },
      });
  }

  captureProcedure(procedureId: string) {
    this.getCandidateInstruction(procedureId);
  }

  getAllProcedures(programId: string): Subscription {
    return this.instructionService.getProcedures(programId).subscribe({
      next: (data: Procedure[]) => {
        this.procedures = data;
      },
      complete: () => {
        console.log(this.procedures);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      },
    });
  }

  getCurrentExaminer(): ExaminerAccount {
   (this.currentExaminer = this.examinerAccountService.getUser());
   return  this.currentExaminer
  }
}
