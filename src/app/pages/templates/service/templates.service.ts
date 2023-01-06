import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssessmentTemplatePage } from '../../assessment/model/assessment-template-page.model';
import { SingleAssessmentDetailTemplate } from '../../assessment/model/single-assessment-detail-template.model';
import { environment } from 'src/environments/environment';
import { ResourceCreated } from 'src/app/shared/model/resource-created';

@Injectable({
  providedIn: 'root',
})
export class TemplatesService {
  constructor(private http: HttpClient) {}

  fetchAllAssessmentDetailsTemplate(): Observable<AssessmentTemplatePage> {
    return this.http.get<AssessmentTemplatePage>(
      `http://${environment.developmentIP}/itembank/api/items/template/assessmentdetails/`,
      { withCredentials: true }
    );
  }

  fetchAssessmentTemplateDetailById(
    templateId: string
  ): Observable<SingleAssessmentDetailTemplate> {
    return this.http.get<SingleAssessmentDetailTemplate>(
      `http://${environment.developmentIP}/itembank/api/items/template/assessmentdetails/${templateId}`,
      { withCredentials: true }
    );
  }

  deleteAssessmentDetailsTemplate(
    templateId: string
  ): Observable<ResourceCreated> {
    return this.http.delete(
      `http://${environment.developmentIP}/itembank/api/items/template/assessmentdetails/${templateId}`,
      { withCredentials: true }
    );
  }
}
