import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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


  constructor(private router: Router, private candidateAccountService: CandidateAccountService) {}

  ngOnInit(): void {
    this.timeOut = setTimeout(() => {
      this.router.navigate(["candidate/login"]);
    }, 8000);
    this.currentCandidate = this.candidateAccountService.getUser()
  }

  ngOnDestroy(): void {
   
    clearTimeout(this.timeOut);
  
    console.log("I have been destroyed and i've cleared time out");
  }
}
