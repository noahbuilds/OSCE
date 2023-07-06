import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {  Subscription, timer } from "rxjs";
import { CandidateAccount } from "src/app/authentication/model/candidate-account";
import { CandidateAccountService } from "src/app/authentication/services/candidate-account.service";
import { PassportService } from "../services/passport.service";

@Component({
  selector: "app-end-exam-page",
  templateUrl: "./end-exam-page.component.html",
  styleUrls: ["./end-exam-page.component.scss"],
})
export class EndExamPageComponent implements OnInit {
  currentCandidate: CandidateAccount;
  timerSub$: Subscription
  image: any = null


  constructor(
    private router: Router, 
    private candidateAccountService: CandidateAccountService,
    private passportService: PassportService
    ) {}

  ngOnInit(): void {
    this.currentCandidate = this.candidateAccountService.getUser();

    this.fetchImage(this.candidateAccountService.getUser().examNumber)
    this.timerSub$ = timer(8000, 8000).subscribe((value) => {
      
      this.router.navigate(["candidate/login"]);

      
    });

  }


  fetchImage(examNumber:string) {

    // console.log("about fetching",'/image/fetch/'+regNumber);
   
     examNumber = examNumber.toLocaleUpperCase();
   
     this.passportService.getPassport('/image/fetch/'+examNumber).subscribe(
   
       data => {
   
         // this.image =  data;
         this.createImageFromBlob(data);
      //   console.log(data, "this is data");
       },
       (err:HttpErrorResponse) =>{
         console.log(err);
       }
     );
   
   
   }
   
   createImageFromBlob(image: Blob) {
     let reader = new FileReader();
     reader.addEventListener("load", () => {
       this.image = reader.result;
     }, false);
   
     if (image) {
       reader.readAsDataURL(image);
     }
   }

  ngOnDestroy(): void {
    if(this.timerSub$ != null){
      this.timerSub$.unsubscribe()
    }
    
  }
}
