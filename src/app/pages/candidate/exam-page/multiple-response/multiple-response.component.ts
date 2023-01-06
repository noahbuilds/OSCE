import { Component, OnInit } from "@angular/core";
import { ItemModel } from "src/app/shared/model/itemModel";
import { ItemService } from "../../services/item.service";
import { AlphabetList } from "src/app/shared/enum/alphabetList";

@Component({
  selector: "app-multiple-response",
  templateUrl: "./multiple-response.component.html",
  styleUrls: ["./multiple-response.component.scss"],
})
export class MultipleResponseComponent implements OnInit {
  currentQuestion: ItemModel;
  currentQuestionNumber: number
  alphabetList: typeof AlphabetList = AlphabetList

  constructor(private itemService: ItemService) { }

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

  optionSelected(value:any, event:any) {
    if (event.target.checked) {
      if (!this.currentQuestion.answers.includes(value)) {
        this.currentQuestion.answers.push(value);
        console.log(this.currentQuestion.answers);
      }
    } else {
      if (this.currentQuestion.answers.includes(value)) {
        const indexToRemove = this.currentQuestion.answers.indexOf(value);

        this.currentQuestion.answers.splice(indexToRemove, 1);
        console.log(this.currentQuestion.answers);
      }
    }
  }

  optionClicked(value: any) {
    if (!this.currentQuestion.answers.includes(value)) {
      this.currentQuestion.answers.push(value);
      console.log(this.currentQuestion.answers);
    } else {
      const indexToRemove = this.currentQuestion.answers.indexOf(value);

      this.currentQuestion.answers.splice(indexToRemove, 1);
      console.log(this.currentQuestion.answers);
    }
  }
}
