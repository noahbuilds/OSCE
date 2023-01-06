import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssessmentSectionTemplatesComponent } from './list-assessment-section-templates.component';

describe('ListAssessmentSectionTemplatesComponent', () => {
  let component: ListAssessmentSectionTemplatesComponent;
  let fixture: ComponentFixture<ListAssessmentSectionTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAssessmentSectionTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssessmentSectionTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
