import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TemplatesPage } from '../model/templates-page.model';
import { TemplatesService } from '../service/templates.service';

@Component({
  selector: 'app-list-assessment-settings-templates',
  templateUrl: './list-assessment-settings-templates.component.html',
  styleUrls: ['./list-assessment-settings-templates.component.scss'],
})
export class ListAssessmentSettingsTemplatesComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  templates: TemplatesPage;

  constructor(private templateService: TemplatesService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'assessment-settings-templates', active: true },
    ];

    this.fetchAllSettingsTemplate();
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

  fetchAllSettingsTemplate() {}
}
