import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkProcedureComponent } from './mark-procedure.component';

describe('MarkProcedureComponent', () => {
  let component: MarkProcedureComponent;
  let fixture: ComponentFixture<MarkProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkProcedureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
