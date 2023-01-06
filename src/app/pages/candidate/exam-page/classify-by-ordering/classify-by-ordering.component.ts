import { Component, OnInit } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ItemService } from "../../services/item.service";
import { ItemModel, Option } from "src/app/shared/model/itemModel";

@Component({
  selector: "app-classify-by-ordering",
  templateUrl: "./classify-by-ordering.component.html",
  styleUrls: ["./classify-by-ordering.component.scss"],
})
export class ClassifyByOrderingComponent implements OnInit {
  currentQuestion: ItemModel;
  currentQuestionNumber: number;
  options: Option[]

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
   this.getCurrentQuestion();
   this.getCurrentQuestionNumber();
    this.getOptions()
  }


  getCurrentQuestion():ItemModel{
    return  this.currentQuestion = this.itemService.getCurrentQuestion();
  }
  getCurrentQuestionNumber():number{
    return this.currentQuestionNumber = this.itemService.currentQuestionNumber;
      }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.options, event.previousIndex, event.currentIndex);
    // console.log(event.currentIndex);
    // console.log(event.previousIndex);
  }

  getOptions(): Option[]{
    return this.options = this.currentQuestion.options
  }
}
