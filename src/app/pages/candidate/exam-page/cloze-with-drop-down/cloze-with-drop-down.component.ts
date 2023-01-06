import { Component, OnInit } from "@angular/core";
import { ItemModel } from "src/app/shared/model/itemModel";

import { ItemService } from "../../services/item.service";

@Component({
  selector: "app-cloze-with-drop-down",
  templateUrl: "./cloze-with-drop-down.component.html",
  styleUrls: ["./cloze-with-drop-down.component.scss"],
})
export class ClozeWithDropDownComponent implements OnInit {

  currentQuestion: ItemModel;
  currentQuestionNumber: number
  displaySplit: boolean = false;
  clozeRenderArray: Array<any> = [];
  extractedTexts: Array<any> = [];
  extractedOptions: any;
  expectedCloze: any = [];
  totalDropBoxes: number = 0

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.removePreviousCloze();
    this.getCurrentQuestion();
    this.getCurrentQuestionNumber();
    this.checkCloze(this.expectedCloze);

    if (this.currentQuestion.answers.length == 0) {
      this.currentQuestion.answers = new Array<string>(this.totalDropBoxes);
      console.log(this.totalDropBoxes + "Dropboxes")
    }
    // this.addOptions(this.clozeRenderArray, this.extractedOptions);
  }

  getCurrentQuestion(): ItemModel {
    this.currentQuestion = this.itemService.getCurrentQuestion();
    return this.expectedCloze.push(this.currentQuestion);
  }
  getCurrentQuestionNumber(): number {
    return this.currentQuestionNumber = this.itemService.currentQuestionNumber;
  }

  checkCloze(expectedCloze: Array<any>) {
    expectedCloze.forEach((element) => {
      this.extractedTexts = element.stimulus.split("{{response}}");
      let totalTextBoxes = this.renderCloze(this.extractedTexts);
      // this.currentQuestion.answers = new Array<string>(totalTextBoxes);
    });
  }

  removePreviousCloze() {
    this.expectedCloze = [];
    this.clozeRenderArray = [];
  }

  renderCloze(extractedTexts: any): number {
    this.totalDropBoxes = 0;
    extractedTexts.forEach((element: any, index: number) => {
      // dont add textbox to the last text
      if (index == this.extractedTexts.length - 1) {
        let clozeRender = { text: element, dropBox: false, index: index };
        this.clozeRenderArray.push(clozeRender);
      } else {
        let clozeRender = { text: element, dropBox: true, index: index };
        this.clozeRenderArray.push(clozeRender);
        ++this.totalDropBoxes;
      }
    });

    return this.totalDropBoxes;
  }

  // addOptions(clozeRenderArray: Array<any>, extractedOptions: Array<any>) {
  //   for (let i = 0; i < clozeRenderArray.length; i++) {
  //     for (let j = 0; j < extractedOptions.length; j++) {
  //       clozeRenderArray[j].possibleResponse = extractedOptions[j];
  //     }
  //   }
  // }
  captureResponses(index:number, dropBoxValue: string) {
    const answerSet = [];
    /* this.textBoxRefList.forEach((element) => {
      answerSet.push(element.value);
      this.currentQuestion.answers = answerSet;
    });*/
    this.currentQuestion.answers[index] = dropBoxValue;
    console.log(index);
    console.log(this.currentQuestion.answers);
  }
}
