import { TemplatesService } from './../service/templates.service';
import { Component, OnInit } from '@angular/core';
import { TemplatesPage } from '../model/templates-page.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-assessment-section-templates',
  templateUrl: './list-assessment-section-templates.component.html',
  styleUrls: ['./list-assessment-section-templates.component.scss'],
})
export class ListAssessmentSectionTemplatesComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  templates: TemplatesPage;

  constructor(private templateService: TemplatesService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'assessment-section-templates', active: true },
    ];
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
