import { Component, OnInit } from "@angular/core";
import { ItemModel } from "src/app/shared/model/itemModel";
import { ItemService } from "../../services/item.service";
import { AlphabetList } from "src/app/shared/enum/alphabetList";

@Component({
  selector: "app-standard-choice",
  templateUrl: "./standard-choice.component.html",
  styleUrls: ["./standard-choice.component.scss"],
})
export class StandardChoiceComponent implements OnInit {
  currentQuestion: ItemModel;
  currentQuestionNumber: number;
  alphabetList: typeof AlphabetList = AlphabetList

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
 
    this.getCurrentQuestion();
    this.getCurrentQuestionNumber();

  }

  getCurrentQuestion(): ItemModel {
   return this.currentQuestion = this.itemService.getCurrentQuestion();
  }
  getCurrentQuestionNumber():number{
    return this.currentQuestionNumber = this.itemService.currentQuestionNumber;
      }

  optionSelected(value) {
    this.currentQuestion.answers[0] = value;
  }
}
