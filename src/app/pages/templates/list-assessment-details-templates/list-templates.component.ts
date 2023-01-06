import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../service/templates.service';
import { TemplatesPage } from '../model/templates-page.model';

@Component({
  selector: 'app-list-templates',
  templateUrl: './list-templates.component.html',
  styleUrls: ['./list-templates.component.scss'],
})
export class ListAssessmentDetailsTemplatesComponent implements OnInit {
  breadCrumbItems!: any;

  templates: TemplatesPage;

  constructor(private templateService: TemplatesService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'assessment-details-templates', active: true },
    ];

    this.fetchAllAssessmentTemplates();
  }

  deleteAll() {}

  fetchAllAssessmentTemplates() {
    this.templateService.fetchAllAssessmentDetailsTemplate().subscribe(
      (value) => {
        console.log(value);
        this.templates = value;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
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
