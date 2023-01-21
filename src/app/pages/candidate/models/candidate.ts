export interface CandidateModel {
  procedureName: string;
  procedureId: string;
  minute: number;
  seconds: number;
  examDetailsId: string;
  responsesId: string;
  candidateProcedureItems: Array<CandidateProcedureItem>;
}

export interface CandidateProcedureItem {
  itemId: string;
  question: string;
  options: Array<CandidateProcedureOption>;
  selectedOption: string;
  currentQuestionNumber?: number;
}

export interface CandidateProcedureOption {
  option: string;
  answer: boolean;
  id: string;
}

export interface CandidateResponseDTO {
  minute: number;
  seconds: number;
  detailsId: string;
  responsesId: string;
  responseSet: Array<CandidateResponse>;
}

export interface CandidateResponse {
  itemId: string;
  optionId: string; 
}
