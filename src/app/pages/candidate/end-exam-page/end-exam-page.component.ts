import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {  Subscription, timer } from "rxjs";
import { CandidateAccount } from "src/app/authentication/model/candidate-account";
import { CandidateAccountService } from "src/app/authentication/services/candidate-account.service";

@Component({
  selector: "app-end-exam-page",
  templateUrl: "./end-exam-page.component.html",
  styleUrls: ["./end-exam-page.component.scss"],
})
export class EndExamPageComponent implements OnInit {
  timeOut: any;
  currentCandidate: CandidateAccount;
  timerSub$: Subscription


  constructor(private router: Router, private candidateAccountService: CandidateAccountService) {}

  ngOnInit(): void {
    this.currentCandidate = this.candidateAccountService.getUser()
    // this.timeOut = setTimeout(() => {
    //   this.router.navigate(["candidate/login"]);
    // }, 8000);

    this.timerSub$ = timer(0, 8000).subscribe((value) => {
      
      this.router.navigate(["candidate/login"]);

      
    });

  }

  ngOnDestroy(): void {
   
    clearTimeout(this.timeOut);
    this.timerSub$.unsubscribe()
  }
}
