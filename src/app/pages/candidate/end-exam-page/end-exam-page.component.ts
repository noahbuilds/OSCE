import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-end-exam-page",
  templateUrl: "./end-exam-page.component.html",
  styleUrls: ["./end-exam-page.component.scss"],
})
export class EndExamPageComponent implements OnInit {
  timeOut: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.timeOut = setTimeout(() => {
      this.router.navigate(["candidate/login"]);
    }, 8000);
  }

  ngOnDestroy(): void {
   
    clearTimeout(this.timeOut);
  
    console.log("I have been destroyed and i've cleared time out");
  }
}
