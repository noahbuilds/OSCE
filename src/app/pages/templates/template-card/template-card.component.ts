import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

import Swal from 'sweetalert2';
import { AssessmentTemplate } from '../../assessment/model/assessment-template.model';
import { AssessmentsService } from '../../assessment/service/assessments.service';
import { TemplatesService } from '../service/templates.service';

@Component({
  selector: 'app-template-card',
  templateUrl: './template-card.component.html',
  styleUrls: ['./template-card.component.scss'],
})
export class TemplateCardComponent implements OnInit {
  @Input() template: AssessmentTemplate | any;

  constructor(private templateService: TemplatesService) {}

  ngOnInit(): void {}

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
