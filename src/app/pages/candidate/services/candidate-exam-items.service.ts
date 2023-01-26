import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { CandidateModel, CandidateProcedureItem, CandidateResponse } from "../models/candidate";

@Injectable({
  providedIn: "root",
})
export class CandidateExamItemsService {
  constructor() {}

  candidateProcedureItems: CandidateProcedureItem[];
  currentQuestion: CandidateProcedureItem;

  candidateExamDetails: CandidateModel;

  currentItemIndex: number = 0;
  previousResponses: CandidateResponse[] = []

  private currentQuestionSubject: BehaviorSubject<CandidateProcedureItem> =
    new BehaviorSubject(null);
    currentQuestion$ = this.currentQuestionSubject.asObservable();

  publishCurrententQuestion(currentQuestion: CandidateProcedureItem) {
    this.currentQuestionSubject.next(currentQuestion);
  }

  getCandidateProcedureItems(): CandidateProcedureItem[] {
    this.candidateProcedureItems = this.candidateExamDetails.candidateProcedureItems
    return this.candidateProcedureItems;
  }

  getCurrentQuestion(): CandidateProcedureItem {
    //return this.currentQuestion =  this.candidateProcedureItem[this.currentQuestionNumber];
    this.currentQuestion =
      this.candidateExamDetails.candidateProcedureItems[this.currentItemIndex];
    this.currentQuestion.currentQuestionNumber = this.currentItemIndex;
    this.publishCurrententQuestion(this.currentQuestion);
    return this.currentQuestion;
  }

  nextQuestion(): void {
    if (
      this.currentItemIndex >=
      this.candidateExamDetails.candidateProcedureItems.length
    )
      return;
    console.log("Next Question called");
    this.currentQuestion =
      this.candidateExamDetails.candidateProcedureItems[
        ++this.currentItemIndex
      ];
    this.currentQuestion.currentQuestionNumber = this.currentItemIndex;

    this.publishCurrententQuestion(this.currentQuestion);
  }

  previousQuestion(): void {
    if (this.currentItemIndex == 0) return;

    this.currentQuestion =
      this.candidateExamDetails.candidateProcedureItems[
        --this.currentItemIndex
      ];
    this.currentQuestion.currentQuestionNumber = this.currentItemIndex;

    this.publishCurrententQuestion(this.currentQuestion);
  }

  navigateTo(index: number){
    this.currentQuestion =
    this.candidateExamDetails.candidateProcedureItems[
      index
    ];
    this.currentItemIndex = index;
    this.currentQuestion.currentQuestionNumber = this.currentItemIndex
    this.publishCurrententQuestion(this.currentQuestion);

  }

  getSavedResponses(): CandidateResponse[]{
    this.candidateProcedureItems.forEach(item => {
      if (item.selectedOption != null){
        let savedResponse= {
          itemId : item.itemId,
          optionId: item.selectedOption
        }
        this.previousResponses.push(savedResponse)
        
      }
    
    });
    return this.previousResponses
  }
}
