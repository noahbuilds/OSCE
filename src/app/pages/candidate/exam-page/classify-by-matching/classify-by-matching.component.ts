import { Component, OnInit } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ItemService } from "../../services/item.service";
import { ItemModel, Option } from "src/app/shared/model/itemModel";

@Component({
  selector: "app-classify-by-matching",
  templateUrl: "./classify-by-matching.component.html",
  styleUrls: ["./classify-by-matching.component.scss"],
})
export class ClassifyByMatchingComponent implements OnInit {
  currentQuestion: ItemModel;
  options: Option[] ;
  currentQuestionNumber: number
  stimulusList: ItemModel["stimulusList"];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
   this.getCurrentQuestion();
   this.getCurrentQuestionNumber();
   this.getStimulusList()
    this.getOptions()
    
  }

  
getCurrentQuestion(): ItemModel{
  return  this.currentQuestion = this.itemService.getCurrentQuestion();
}

getCurrentQuestionNumber():number{
  return this.currentQuestionNumber = this.itemService.currentQuestionNumber;
    }

  getOptions():Option[]{
    return this.options = this.currentQuestion.options
  }

  getStimulusList():ItemModel["stimulusList"]{
    return this.stimulusList = this.currentQuestion.stimulusList
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.stimulusList, event.previousIndex, event.currentIndex);
  }
}
