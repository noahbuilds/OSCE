import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCandidateExamsComponent } from './list-candidate-exams.component';

describe('ListCandidateExamsComponent', () => {
  let component: ListCandidateExamsComponent;
  let fixture: ComponentFixture<ListCandidateExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCandidateExamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCandidateExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
