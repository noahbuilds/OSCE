import { Component, OnInit } from "@angular/core";
import { ItemModel } from "src/app/shared/model/itemModel";
import { ItemService } from "../../services/item.service";
import { AlphabetList } from "src/app/shared/enum/alphabetList";

@Component({
  selector: "app-true-or-false",
  templateUrl: "./true-or-false.component.html",
  styleUrls: ["./true-or-false.component.scss"],
})
export class TrueOrFalseComponent implements OnInit {
  

  currentQuestion: ItemModel;
  currentQuestionNumber: number;
  alphabetList: typeof AlphabetList = AlphabetList

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.getCurrentQuestion();
    this.getCurrentQuestionNumber();
  }

  optionSelected(value) {
    this.currentQuestion.answers[0] = value;
  }

  getCurrentQuestion(): ItemModel {
    return this.currentQuestion = this.itemService.getCurrentQuestion();
  }

  getCurrentQuestionNumber():number{
return this.currentQuestionNumber = this.itemService.currentQuestionNumber;
  }
 
}