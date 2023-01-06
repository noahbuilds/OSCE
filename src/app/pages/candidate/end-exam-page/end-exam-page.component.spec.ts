import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndExamPageComponent } from './end-exam-page.component';

describe('EndExamPageComponent', () => {
  let component: EndExamPageComponent;
  let fixture: ComponentFixture<EndExamPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndExamPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndExamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
