import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { TimeService } from "../services/time.service";

@Component({
  selector: "instruction-page",
  templateUrl: "./instruction-page.component.html",
  styleUrls: ["./instruction-page.component.scss"],
})
export class InstructionPageComponent implements OnInit {
  timeLeft: number = 10;
  constructor(private router: Router, private timeSerivice: TimeService) { }

  ngOnInit(): void { }

   startExam() {
    this.router.navigate(["candidate/list-exams"]);
   }

 
  endExam() {
    this.router.navigate(["candidate/end-exam"]);
    console.log("exam has ended");
  }
}
