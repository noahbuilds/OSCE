import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentSettingsTemplateCardComponent } from './assessment-settings-template-card.component';

describe('AssessmentSettingsTemplateCardComponent', () => {
  let component: AssessmentSettingsTemplateCardComponent;
  let fixture: ComponentFixture<AssessmentSettingsTemplateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentSettingsTemplateCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentSettingsTemplateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
