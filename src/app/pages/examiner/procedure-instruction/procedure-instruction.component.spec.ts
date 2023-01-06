import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureInstructionComponent } from './procedure-instruction.component';

describe('ProcedureInstructionComponent', () => {
  let component: ProcedureInstructionComponent;
  let fixture: ComponentFixture<ProcedureInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedureInstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
