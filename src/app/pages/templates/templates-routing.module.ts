import { ListAssessmentDetailsTemplatesComponent } from './list-assessment-details-templates/list-templates.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAssessmentSectionTemplatesComponent } from './list-assessment-section-templates/list-assessment-section-templates.component';
import { ListAssessmentSettingsTemplatesComponent } from './list-assessment-settings-templates/list-assessment-settings-templates.component';

const routes: Routes = [
  {
    path: 'assessment-details',
    component: ListAssessmentDetailsTemplatesComponent,
  },
  {
    path: 'assessment-section',
    component: ListAssessmentSectionTemplatesComponent,
  },
  {
    path: 'assessment-settings',
    component: ListAssessmentSettingsTemplatesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplatesRoutingModule {}
