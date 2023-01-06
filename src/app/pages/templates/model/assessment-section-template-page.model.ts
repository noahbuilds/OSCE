import { TemplatesPageContent } from "./templates-page-content.model";

export class AssessmentSectionTemplatePage {
  totalElements: number;
  totalPages: number;
  size: number;
  content: TemplatesPageContent[];
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}
