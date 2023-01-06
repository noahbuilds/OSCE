import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorProcedureComponent } from './monitor-procedure.component';

describe('MonitorProcedureComponent', () => {
  let component: MonitorProcedureComponent;
  let fixture: ComponentFixture<MonitorProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorProcedureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
