import { Component, OnInit } from "@angular/core";

import { AlphabetList } from "src/app/shared/enum/alphabetList";
import { CandidateExamItemsService } from "../../services/candidate-exam-items.service";
import {
  CandidateProcedureItem,
  CandidateResponse,
} from "../../models/candidate";
@Component({
  selector: "app-standard-choice",
  templateUrl: "./standard-choice.component.html",
  styleUrls: ["./standard-choice.component.scss"],
})
export class StandardChoiceComponent implements OnInit {
  currentQuestion: CandidateProcedureItem;
  currentQuestionNumber: number;
  alphabetList: typeof AlphabetList = AlphabetList;
  candidateResponses: CandidateResponse[] = [];

  constructor(private candidateExamItemsService: CandidateExamItemsService) {}

  ngOnInit(): void {
    //this.currentQuestion = this.candidateExamItemsService.getCurrentQuestion()

    this.candidateExamItemsService.currentQuestion$.subscribe((item) => {
      this.currentQuestion = item;
      this.currentQuestionNumber = item.currentQuestionNumber
    });
    this.getSavedResponses()
    
  }

  // displayQuestion(){
    
  // }

  getSavedResponses(){
    this.candidateExamItemsService.getSavedResponses().forEach(response => {
      this.candidateResponses.push(response)
    });
  }
  
  captureResponse(optionId: string, itemId: string) {
    this.currentQuestion.selectedOption = optionId;
   
    let selectedOptions = {
      optionId: optionId,
      itemId: itemId,
    };
    // this.candidateExamItemsService.currentQuestion$.subscribe({
    //   next(value) {
    //     value = this.currentQuestion
    //   },
    // })

    //check if attempted before push
    if (
      !this.attemptedBefore(
        selectedOptions.itemId,
      )
    ) {
      this.candidateResponses.push(selectedOptions);
      
    } else {
      this.candidateResponses.forEach((response) => {
        if (response.itemId === selectedOptions.itemId) {
          response.optionId = selectedOptions.optionId;
       
        }
       
        return;
      });
    }
    this.getSelectedOptions()
  }

  attemptedBefore(itemId: string): boolean {
    var found = this.candidateResponses.find(
      (id) => id.itemId === itemId
    );

    return found == null ? false : true;
  }

  getSelectedOptions(): CandidateResponse[] {
    console.log(this.candidateResponses)
    return this.candidateResponses;
  }

  
}
