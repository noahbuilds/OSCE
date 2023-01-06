import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { ItemModel } from 'src/app/shared/model/itemModel';
@Component({
  selector: 'app-essay-with-short-text',
  templateUrl: './essay-with-short-text.component.html',
  styleUrls: ['./essay-with-short-text.component.scss']
})
export class EssayWithShortTextComponent implements OnInit {
  
  
  currentQuestion: ItemModel
  displaySplit: boolean =false
  currentQuestionNumber: number
 
  constructor( private itemService: ItemService) { }

  ngOnInit(): void {
    this.getCurrentQuestion();
    this.getCurrentQuestionNumber();
  }

  getCurrentQuestionNumber():number{
    return this.currentQuestionNumber = this.itemService.currentQuestionNumber;
      }

      getCurrentQuestion(): ItemModel {
        return this.currentQuestion = this.itemService.getCurrentQuestion()
      }

changeDisplay(): boolean{
 return this.displaySplit = !this.displaySplit;
}
}
