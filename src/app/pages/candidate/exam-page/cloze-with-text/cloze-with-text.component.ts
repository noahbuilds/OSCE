import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";

import { ItemModel } from "src/app/shared/model/itemModel";
import { ItemService } from "../../services/item.service";
import { NgModel } from "@angular/forms";

@Component({
  selector: "app-cloze-with-text",
  templateUrl: "./cloze-with-text.component.html",
  styleUrls: ["./cloze-with-text.component.scss"],
})
export class ClozeWithTextComponent implements OnInit {
  currentQuestion: ItemModel;
  currentQuestionNumber: number;
  displaySplit: boolean = false;

  clozeRenderArray: Array<any> = [];
  extractedTexts: Array<any> = [];
  expectedCloze: Array<any> = [];
  totalTextBoxes: number = 0;

  constructor(private itemService: ItemService) {}

  // @ViewChildren(NgModel) textBoxRefList: QueryList<NgModel>;

  ngOnInit(): void {
    this.removePreviousCloze();
    this.getCurrentQuestion();
    this.getCurrentQuestionNumber();
    this.expectedCloze.push(this.currentQuestion);
    this.checkCloze(this.expectedCloze);

    console.log(this.currentQuestion);
    // let totalTextBoxes =
    if (this.currentQuestion.answers.length == 0) {
      this.currentQuestion.answers = new Array<string>(this.totalTextBoxes);
      console.log(this.totalTextBoxes + "textboxes");
    }
  }

  getCurrentQuestion(): ItemModel {
    return (this.currentQuestion = this.itemService.getCurrentQuestion());
  }
  getCurrentQuestionNumber(): number {
    return (this.currentQuestionNumber =
      this.itemService.currentQuestionNumber);
  }

  removePreviousCloze(): void {
    this.expectedCloze = [];
    this.clozeRenderArray = [];
  }

  checkCloze(expectedCloze: Array<any>): void {
    expectedCloze.forEach((element) => {
      this.extractedTexts = element.stimulus.split("{{response}}");
      let totalTextBoxes = this.renderCloze(this.extractedTexts);
      // this.currentQuestion.answers = new Array<string>(totalTextBoxes);
      // console.log(totalTextBoxes + "textboxes")
    });
  }

  renderCloze(extractedTexts: any): number {
    this.totalTextBoxes = 0;
    extractedTexts.forEach((element: any, index: number) => {
      // dont add textbox to the last text
      if (index == this.extractedTexts.length - 1) {
        let clozeRender = { text: element, textBox: false, index: index };
        this.clozeRenderArray.push(clozeRender);
      } else {
        let clozeRender = { text: element, textBox: true, index: index };
        this.clozeRenderArray.push(clozeRender);
        ++this.totalTextBoxes;
      }
    });

    return this.totalTextBoxes;
  }

  captureResponses(index: number, textBoxValue: string) {
    const answerSet = [];
    /* this.textBoxRefList.forEach((element) => {
      answerSet.push(element.value);
      this.currentQuestion.answers = answerSet;
    });*/

    this.currentQuestion.answers[index] = textBoxValue;
    // console.log(index);
    console.log(this.currentQuestion);
  }
}
