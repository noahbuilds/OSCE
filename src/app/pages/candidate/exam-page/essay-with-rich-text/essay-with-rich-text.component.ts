import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/shared/model/itemModel';
import { ItemService } from "../../services/item.service";


@Component({
  selector: 'app-essay-with-rich-text',
  templateUrl: './essay-with-rich-text.component.html',
  styleUrls: ['./essay-with-rich-text.component.scss']
})
export class EssayWithRichTextComponent implements OnInit {

  currentQuestion: ItemModel;
  currentQuestionNumber: number

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getCurrentQuestion();
    this.getCurrentQuestionNumber();
   
  }

  getCurrentQuestion(): ItemModel{
    return this.currentQuestion = this.itemService.getCurrentQuestion()
  }
  getCurrentQuestionNumber():number{
    return this.currentQuestionNumber = this.itemService.currentQuestionNumber;
      }


}