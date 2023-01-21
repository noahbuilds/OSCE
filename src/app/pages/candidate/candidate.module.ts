import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CandidateComponent } from "./candidate.component";
import { ExamPageComponent } from "./exam-page/exam-page.component";
import { EndExamPageComponent } from "./end-exam-page/end-exam-page.component";
import { InstructionPageComponent } from "./instruction-page/instruction-page.component";
import { CandidateRoutingModule } from "./candidate-routing.module";
import { FormsModule } from "@angular/forms";
import { StandardChoiceComponent } from "./exam-page/standard-choice/standard-choice.component";
import { EditorModule, TINYMCE_SCRIPT_SRC } from "@tinymce/tinymce-angular";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { NgSelectModule } from "@ng-select/ng-select";
import { SimplebarAngularModule } from "simplebar-angular";

@NgModule({
  declarations: [
    CandidateComponent,
    ExamPageComponent,
    EndExamPageComponent,
    InstructionPageComponent,
    StandardChoiceComponent,
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    FormsModule,
    EditorModule,
    NgbDropdownModule,
    CKEditorModule,
    NgSelectModule,
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
