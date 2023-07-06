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
  proceduresTest = [
    { id: 1, name: "num1" },
    { id: 2, name: "num2" },
  ];
  capturedName: string = "";
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
    // console.log(this.)
  }

  getCandidateInstruction(procedureId: string) {
    this.instructionService.getCandidateInstruction(procedureId).subscribe({
      next: (data: InstructionModel) => {
        this.candidateInstruction = data;
      },
      complete: () => {
        // console.log(this.candidateInstruction);
      },
      error(err: HttpErrorResponse) {
        console.log(err.error.message);
      },
    });
  }

  captureProcedure(event: any) {
    let captured = event;
    // console.log( captured.id + captured.name)
    this.getCandidateInstruction(captured.id);
    this.capturedName = captured.name;
  }

  getAllProcedures(programId: string) {
    this.instructionService.getProcedures(programId).subscribe({
      next: (data: Procedure[]) => {
        this.procedures = data;
      },
      complete: () => {
        // console.log(this.procedures);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      },
    });
  }

  getCurrentExaminer() {
    this.currentExaminer = this.examinerAccountService.getUser();
  }

  printCandidateInstruction() {
    window.print();
  }
}
