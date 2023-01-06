import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateInstructionComponent } from './candidate-instruction.component';

describe('CandidateInstructionComponent', () => {
  let component: CandidateInstructionComponent;
  let fixture: ComponentFixture<CandidateInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateInstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
