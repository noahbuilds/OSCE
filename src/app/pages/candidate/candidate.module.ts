import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CandidateComponent } from "./candidate.component";
import { ExamPageComponent } from "./exam-page/exam-page.component";
import { EndExamPageComponent } from "./end-exam-page/end-exam-page.component";
import { InstructionPageComponent } from "./instruction-page/instruction-page.component";
import { CandidateRoutingModule } from "./candidate-routing.module";
import { TrueOrFalseComponent } from "./exam-page/true-or-false/true-or-false.component";
import { MultipleResponseComponent } from "./exam-page/multiple-response/multiple-response.component";
import { NavigatorComponent } from "./exam-page/components/navigator/navigator.component";
import { FormsModule } from "@angular/forms";
import { StandardChoiceComponent } from "./exam-page/standard-choice/standard-choice.component";
import { EssayWithShortTextComponent } from "./exam-page/essay-with-short-text/essay-with-short-text.component";
import { EssayWithRichTextComponent } from "./exam-page/essay-with-rich-text/essay-with-rich-text.component";
import { EditorModule, TINYMCE_SCRIPT_SRC } from "@tinymce/tinymce-angular";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { NgSelectModule } from "@ng-select/ng-select";
import { ClassifyByOrderingComponent } from "./exam-page/classify-by-ordering/classify-by-ordering.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ClassifyByMatchingComponent } from "./exam-page/classify-by-matching/classify-by-matching.component";
import { ClozeWithTextComponent } from "./exam-page/cloze-with-text/cloze-with-text.component";
import { ClozeWithDropDownComponent } from "./exam-page/cloze-with-drop-down/cloze-with-drop-down.component";
import { TextBoxComponent } from "./exam-page/components/text-box/text-box.component";
import { SimplebarAngularModule } from "simplebar-angular";
import { ListCandidateExamsComponent } from './list-candidate-exams/list-candidate-exams.component';

@NgModule({
  declarations: [
    CandidateComponent,
    ExamPageComponent,
    EndExamPageComponent,
    InstructionPageComponent,
    TrueOrFalseComponent,
    MultipleResponseComponent,
    NavigatorComponent,
    StandardChoiceComponent,
    EssayWithShortTextComponent,
    EssayWithRichTextComponent,
    ClassifyByOrderingComponent,
    ClassifyByMatchingComponent,
    ClozeWithTextComponent,
    ClozeWithDropDownComponent,
    TextBoxComponent,
    ListCandidateExamsComponent,
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    FormsModule,
    EditorModule,
    NgbDropdownModule,
    CKEditorModule,
    NgSelectModule,
    DragDropModule,
    SimplebarAngularModule,
  ],
  providers: [
    {
      provide: TINYMCE_SCRIPT_SRC,
      useValue: "tinymce/tinymce.min.js",
    },
  ],
})
export class CandidateModule {}
