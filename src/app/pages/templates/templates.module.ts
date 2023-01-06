import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { TemplatesRoutingModule } from './templates-routing.module';
import { ListAssessmentDetailsTemplatesComponent } from './list-assessment-details-templates/list-templates.component';
import { TemplateCardComponent } from './template-card/template-card.component';
import { SectionTemplateCardComponent } from './section-template-card/section-template-card.component';
import { AssessmentDetailsTemplateCardComponent } from './assessment-details-template-card/assessment-details-template-card.component';
import { AssessmentSettingsTemplateCardComponent } from './assessment-settings-template-card/assessment-settings-template-card.component';
import { ListAssessmentSettingsTemplatesComponent } from './list-assessment-settings-templates/list-assessment-settings-templates.component';
import { ListAssessmentSectionTemplatesComponent } from './list-assessment-section-templates/list-assessment-section-templates.component';

@NgModule({
  declarations: [
    ListAssessmentDetailsTemplatesComponent,
    TemplateCardComponent,
    SectionTemplateCardComponent,
    AssessmentDetailsTemplateCardComponent,
    AssessmentSettingsTemplateCardComponent,
    ListAssessmentSettingsTemplatesComponent,
    ListAssessmentSectionTemplatesComponent,
  ],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    SharedModule,
    NgbDropdownModule,
  ],
})
export class TemplatesModule {}
