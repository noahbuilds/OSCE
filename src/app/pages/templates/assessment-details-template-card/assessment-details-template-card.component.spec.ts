import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDetailsTemplateCardComponent } from './assessment-details-template-card.component';

describe('AssessmentDetailsTemplateCardComponent', () => {
  let component: AssessmentDetailsTemplateCardComponent;
  let fixture: ComponentFixture<AssessmentDetailsTemplateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentDetailsTemplateCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentDetailsTemplateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
