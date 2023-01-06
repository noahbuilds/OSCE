import { Injectable } from "@angular/core";
import { ItemType } from "src/app/shared/enum/itemTypes";
import { ItemModel } from "src/app/shared/model/itemModel";

@Injectable({
  providedIn: "root",
})
export class ItemService {
  constructor() {}

  currentQuestionNumber: number = 0;

  private items: ItemModel[] = [
    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.TRUE_FALSE,
      stimulus: "The capital of Nigeria is Lagos ?",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [
        { label: "TRUE", value: "1" },
        { label: "False", value: "2" },
      ],
      numerical: false,
      selectedResponse: "",
    },

    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.TRUE_FALSE,
      stimulus: "I dont expect u to work ?",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [
        { label: "TRUE", value: "1" },
        { label: "False", value: "2" },
      ],
      numerical: false,
      selectedResponse: "",
    },
    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.TRUE_FALSE,
      stimulus: "I dont expect u too to work ?",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [
        { label: "Abi", value: "1" },
        { label: "Rara", value: "2" },
      ],
      numerical: false,
      selectedResponse: "",
    },

    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.MCQ,
      stimulus: "The sum of 2 and 4 is  ?",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [
        { label: "4", value: "1" },
        { label: "5", value: "2" },
        { label: "6", value: "3" },
        { label: "7", value: "4" },
      ],
      numerical: false,
    },

    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.MCQ,
      stimulus: "The Difference of 4 and 1 is  ?",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [
        { label: "3", value: "1" },
        { label: "1", value: "2" },
        { label: "0", value: "3" },
        { label: "9", value: "4" },
      ],
      numerical: false,
    },
    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.MRQ,
      stimulus: "Which of the following are correct about Nigeria  ?",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [
        { label: "Flag has 3 colors", value: "1" },
        { label: "Has 37 states", value: "2" },
        { label: "Colonised by Ghana", value: "3" },
        { label: "Has military Govt", value: "4" },
      ],
      numerical: false,
    },
    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.MRQ,
      stimulus: "Which of the following are correct about Abuja  ?",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [
        { label: "Has military Govt", value: "1" },
        { label: "Largest city in Nigeria", value: "2" },
        { label: "Colonised by Ghana", value: "3" },
        { label: "Is not the capital of Nigeria  ", value: "4" },
      ],
      numerical: false,
    },
    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.CLOZE_TEXT,
      stimulus:
        "ade is a {{response}} and he is from {{response}} he also likes {{response}}, he goes to {{response}} school, he is {{response}} and {{response}} and {{response}} however, whenever he is with is friend {{response}} he likes {{response}} and this makes him really {{response}}. The auto of this question is {{response}}",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [],
      numerical: false,
    },
    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.CLOZE_TEXT,
      stimulus:
        "tunde is a {{response}} and he is from {{response}} he also likes {{response}}, he goes to {{response}} school, he is {{response}} and {{response}} and {{response}} however, whenever he is with is friend {{response}} he likes {{response}} and this makes him really {{response}}. The auto of this question is {{response}}",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [],
      numerical: false,
    },

    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.CLOZE_DROPDOWN,
      stimulus: "Nigeria is a {{response}} located in {{response}}",
      possibleResponses: [
        { responses: ["country", "city"] },
        { responses: ["america", "Angola"] },
      ],
      caseSensitive: false,
      answers: [],
      options: [],
      numerical: false,
    },
    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.CLOZE_DROPDOWN,
      stimulus:
        "Togo is a {{response}} located in {{response}} it is known for {{response}} resources and {{response}}",
      possibleResponses: [
        { responses: ["town", "country"] },
        { responses: ["america", "canada"] },
        { responses: ["mineral", "natural"] },
        { responses: ["Salvery", "Faaji"] },
      ],
      caseSensitive: false,
      answers: [],
      options: [],
      numerical: false,
    },

    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.CLOZE_TEXT,
      stimulus:
        "Bola is a {{response}} and he is from {{response}} he also likes {{response}}, he goes to {{response}} school, he is {{response}} and {{response}} and {{response}} however, whenever he is with is friend {{response}} he likes {{response}} and this makes him really {{response}}. The auto of this question is {{response}}",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [],
      numerical: false,
    },

    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.SHORT_ESSAY,
      stimulus: "write shortly What do you understand by Devotion",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [],
      numerical: false,
    },

    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.RICH_ESSAY,
      stimulus: "write richly What do you understand by Devotion  ",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [],
      numerical: false,
    },
    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.RICH_ESSAY,
      stimulus:
        "In not less than 100 words explain richly What do you understand by 'bu45bub45uber' In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber'In not less than 100 words explain richly What do you understand by 'bu45bub45uber' ",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [],
      numerical: false,
    },

    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.SHORT_ESSAY,
      stimulus: "Briefly tell me about yourself ",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [],
      numerical: false,
    },
    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.SHORT_ESSAY,
      stimulus: "Briefly tell me what you understand by programming ",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [],
      numerical: false,
    },

    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.MATCHING,
      stimulus: "Match the following ",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [
        { label: "2001", value: "1" },
        { label: "2002", value: "2" },
        { label: "2003", value: "3" },
        { label: "2004", value: "4" },
        { label: "20012", value: "5" },
        { label: "20021", value: "6" },
        { label: "20013", value: "7" },
        { label: "2006", value: "8" },
        { label: "2000", value: "9" },
      ],
      stimulusList: [
        "Episode I - The Phantom Menace",
        "Episode II - Attack of the Clones",
        "Episode III - Revenge of the Sith",
        "Episode IV - A New Hope",
        "Episode V - The Empire Strikes Back",
        "Episode VI - Return of the Jedi",
        "Episode VII - The Force Awakens",
        "Episode VIII - The Last Jedi",
        "Episode IX – The Rise of Skywalker",
      ],
      numerical: false,
    },
    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.MATCHING,
      stimulus: "Match the following ",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [
        { label: "2001", value: "1" },
        { label: "2002", value: "2" },
        { label: "2003", value: "3" },
        { label: "2004", value: "4" },
        { label: "20012", value: "5" },
        { label: "20021", value: "6" },
        { label: "20013", value: "7" },
        { label: "2006", value: "8" },
        { label: "2000", value: "9" },
      ],
      stimulusList: [
        "Episode I - The Phantom Menace",
        "Episode II - Attack of the Clones",
        "Episode III - Revenge of the Sith",
        "Episode IV - A New Hope",
        "Episode V - The Empire Strikes Back",
        "Episode VI - Return of the Jedi",
        "Episode VII - The Force Awakens",
        "Episode VIII - The Last Jedi",
        "Episode IX – The Rise of Skywalker",
      ],
      numerical: false,
    },
    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.ORDERING,
      stimulus: "Order the following items ",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [
        { label: "2001", value: "1" },
        { label: "2002", value: "2" },
        { label: "2003", value: "3" },
        { label: "2004", value: "4" },
        { label: "20012", value: "5" },
        { label: "20021", value: "6" },
        { label: "20013", value: "7" },
        { label: "2006", value: "8" },
        { label: "2000", value: "9" },
      ],
      numerical: false,
    },

    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.ORDERING,
      stimulus: "Order the following items part 2 ",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [
        { label: "200", value: "1" },
        { label: "202", value: "2" },
        { label: "203", value: "3" },
        { label: "004", value: "4" },
        { label: "2012", value: "5" },
        { label: "2021", value: "6" },
        { label: "2013", value: "7" },
        { label: "206", value: "8" },
        { label: "200", value: "9" },
      ],
      numerical: false,
    },
    {
      id: "string",
      subjectId: "string",
      itemType: ItemType.ORDERING,
      stimulus: "Order the following items part 3 ",
      possibleResponses: [],
      caseSensitive: false,
      answers: [],
      options: [
        { label: "201", value: "1" },
        { label: "22", value: "2" },
        { label: "23", value: "3" },
        { label: "04", value: "4" },
        { label: "212", value: "5" },
        { label: "221", value: "6" },
        { label: "203", value: "7" },
        { label: "20", value: "8" },
        { label: "210", value: "9" },
      ],
      numerical: false,
    },
  ];

  getItems(): ItemModel[] {
    return this.items;
  }

  getCurrentQuestionNumber(): number {
    return this.currentQuestionNumber;
  }

  getCurrentQuestion(): ItemModel {
    // console.log(this.currentQuestionNumber);
    // console.log(this.items[this.currentQuestionNumber]);
    return this.items[this.currentQuestionNumber];
  }

  getNextQuestionItemType(): ItemType {
    return this.items[++this.currentQuestionNumber].itemType;
  }
  getPreviousQuestionItemType(): ItemType {
    return this.items[--this.currentQuestionNumber].itemType;
  }

  getPreviousQuestion(): ItemModel {
    return this.items[--this.currentQuestionNumber];
  }

  nextQuestionNumber(): number {
    ++this.currentQuestionNumber; //
    return this.currentQuestionNumber;
  }

  previousQuestionNumber(): number {
    --this.currentQuestionNumber;
    return this.currentQuestionNumber;
  }

  // isLastQuestionNumber(): boolean {
  //   // console.log(this.currentQuestionNumber + 'from service')
  //   if(this.currentQuestionNumber + 1 == this.items.length-1){

  //     return true;
  //   }
  //   return false;
  // }

  // isFirstQuestionNumber(): boolean {
  //   if(this.currentQuestionNumber == 0){
  //     return true
  //   }
  //   return false
  // }
}
