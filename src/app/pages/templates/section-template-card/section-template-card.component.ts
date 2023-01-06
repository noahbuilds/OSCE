import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { AssessmentTemplate } from '../../assessment/model/assessment-template.model';
import { TemplatesService } from '../service/templates.service';

@Component({
  selector: 'app-section-template-card',
  templateUrl: './section-template-card.component.html',
  styleUrls: ['./section-template-card.component.scss']
})
export class SectionTemplateCardComponent implements OnInit {

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
