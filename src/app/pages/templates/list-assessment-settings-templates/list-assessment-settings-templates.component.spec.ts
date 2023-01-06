import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssessmentSettingsTemplatesComponent } from './list-assessment-settings-templates.component';

describe('ListAssessmentSettingsTemplatesComponent', () => {
  let component: ListAssessmentSettingsTemplatesComponent;
  let fixture: ComponentFixture<ListAssessmentSettingsTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAssessmentSettingsTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssessmentSettingsTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
