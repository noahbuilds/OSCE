import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AssessmentTemplate } from '../../assessment/model/assessment-template.model';
import { TemplatesService } from '../service/templates.service';

@Component({
  selector: 'app-assessment-settings-template-card',
  templateUrl: './assessment-settings-template-card.component.html',
  styleUrls: ['./assessment-settings-template-card.component.scss']
})
export class AssessmentSettingsTemplateCardComponent implements OnInit {

  @Input() template: AssessmentTemplate | any;

  constructor(private templateService: TemplatesService) { }

  ngOnInit(): void {
  }

  deleteTemplate(templateId: string) {
    this.templateService.deleteAssessmentDetailsTemplate(templateId).subscribe(
      (value) => {
        console.log(value);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

}
