import { ItemType } from "../enum/itemTypes";

export interface ItemModel {
  id: string;
  subjectId: string;
  itemType: ItemType;
  stimulus: string;
  possibleResponses: Array<Response>;
  caseSensitive?: boolean;
  answers?: string[];
  options?: Array<Option>;
  numerical?: boolean;
  selectedResponse?:string;
  stimulusList?: Array<string>;
}

export interface Option {
  label: string;
  value: string;
}

// export interface StimulusList {
//   stimulusList: Array<string>;
// }

export interface Response {
  responses: Array<string>;
}
