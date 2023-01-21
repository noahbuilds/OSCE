import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { CandidateModel, CandidateProcedureItem } from "../models/candidate";

@Injectable({
  providedIn: "root",
})
export class CandidateExamItemsService {
  constructor() {}

  candidateProcedureItems: CandidateProcedureItem[];
  currentQuestionNumber: number = 0;
  currentQuestion: CandidateProcedureItem

  candidateExamDetails : CandidateModel ;

  currentItemIndex : number = 0;

  private currentQuestionSubject : BehaviorSubject<CandidateProcedureItem> = new BehaviorSubject( null);
  currentQuestion$ = this.currentQuestionSubject.asObservable();


 
  testQuestion: any

  publishCurrententQuestion(currentQuestion : CandidateProcedureItem){

    this.currentQuestionSubject.next(currentQuestion);
  }


  getCandidateProcedureItems(): CandidateProcedureItem[] {
    
    return  this.candidateProcedureItems;
  }

  getCurrentQuestion() : CandidateProcedureItem {
    //return this.currentQuestion =  this.candidateProcedureItem[this.currentQuestionNumber];
    this.currentQuestion = this.candidateExamDetails.candidateProcedureItems[this.currentItemIndex];
    this.currentQuestion.currentQuestionNumber = this.currentItemIndex;
    this.publishCurrententQuestion(this.currentQuestion);
    return this.currentQuestion;
  }


  nextQuestion(): void {
    if(this.currentItemIndex >= this.candidateExamDetails.candidateProcedureItems.length )
        return;
        console.log("Next Question called");
     this.currentQuestion = this.candidateExamDetails.candidateProcedureItems[++this.currentItemIndex];
     this.currentQuestion.currentQuestionNumber = this.currentItemIndex;

    this.publishCurrententQuestion(this.currentQuestion);

  }

  previousQuestion(): void {
    if(this.currentItemIndex == 0 )
        return;
    
     this.currentQuestion = this.candidateExamDetails.candidateProcedureItems[--this.currentItemIndex];
    this.currentQuestion.currentQuestionNumber = this.currentItemIndex;

    this.publishCurrententQuestion(this.currentQuestion);

  }


}
