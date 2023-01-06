import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndExamPageComponent } from './end-exam-page/end-exam-page.component';
import { ExamPageComponent } from './exam-page/exam-page.component';
import { InstructionPageComponent } from './instruction-page/instruction-page.component';
import { ListCandidateExamsComponent } from './list-candidate-exams/list-candidate-exams.component';

const routes: Routes = [
    
    {path:'instruction', component: InstructionPageComponent},
    {path:'end-exam', component: EndExamPageComponent},
    {path:'exam', component: ExamPageComponent},
    {path: 'list-exams' , component: ListCandidateExamsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
