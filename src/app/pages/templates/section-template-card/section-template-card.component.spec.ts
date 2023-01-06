import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTemplateCardComponent } from './section-template-card.component';

describe('SectionTemplateCardComponent', () => {
  let component: SectionTemplateCardComponent;
  let fixture: ComponentFixture<SectionTemplateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTemplateCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTemplateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
