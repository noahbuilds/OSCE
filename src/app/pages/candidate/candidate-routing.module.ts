import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndExamPageComponent } from './end-exam-page/end-exam-page.component';
import { ExamPageComponent } from './exam-page/exam-page.component';
import { InstructionPageComponent } from './instruction-page/instruction-page.component';
import { StartedExamGuard } from 'src/app/core/guards/started-exam.guard';
import { EndedExamGuard } from 'src/app/core/guards/ended-exam.guard';
import { DisableBackButtonGuard } from 'src/app/core/guards/disable-back-button.guard';

const routes: Routes = [
    
    {path:'instruction', component: InstructionPageComponent},
    {path:'end-exam', component: EndExamPageComponent, canActivate: [EndedExamGuard]},
    {path:'exam', component: ExamPageComponent, canActivate: [StartedExamGuard], canDeactivate: [DisableBackButtonGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
