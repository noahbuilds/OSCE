import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
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
  savedResponses: CandidateResponse[] = []

  private currentQuestionSubject: BehaviorSubject<CandidateProcedureItem> =
    new BehaviorSubject(null);
    currentQuestion$ = this.currentQuestionSubject.asObservable();

  publishCurrentQuestion(currentQuestion: CandidateProcedureItem) {
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
    this.publishCurrentQuestion(this.currentQuestion);
    return this.currentQuestion;
  }

  nextQuestion(): void {
    if (
      this.currentItemIndex >=
      this.candidateExamDetails.candidateProcedureItems.length
    )
      return;
    this.currentQuestion =
      this.candidateExamDetails.candidateProcedureItems[
        ++this.currentItemIndex
      ];
    this.currentQuestion.currentQuestionNumber = this.currentItemIndex;

    this.publishCurrentQuestion(this.currentQuestion);
  }

  previousQuestion(): void {
    if (this.currentItemIndex == 0) return;

    this.currentQuestion =
      this.candidateExamDetails.candidateProcedureItems[
        --this.currentItemIndex
      ];
    this.currentQuestion.currentQuestionNumber = this.currentItemIndex;

    this.publishCurrentQuestion(this.currentQuestion);
  }

  navigateTo(index: number){
    this.currentQuestion =
    this.candidateExamDetails.candidateProcedureItems[
      index
    ];
    this.currentItemIndex = index;
    this.currentQuestion.currentQuestionNumber = this.currentItemIndex
    this.publishCurrentQuestion(this.currentQuestion);

  }

  getSavedResponses(): CandidateResponse[]{
    this.candidateProcedureItems.forEach(item => {
      if (item.selectedOption != null){
        let savedResponse= {
          itemId : item.itemId,
          optionId: item.selectedOption
        }
        if(!this.alreadyExits(item.itemId)){
          this.savedResponses.push(savedResponse)
        }
        
        
      }
    
    });
   
    return this.savedResponses
  }

  alreadyExits(itemId: string): boolean {
    var found = this.savedResponses.find(
      (id) => id.itemId === itemId
    );

    return found == null ? false : true;
  }
}
