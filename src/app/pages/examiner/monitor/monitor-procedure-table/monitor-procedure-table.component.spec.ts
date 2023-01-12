import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorProcedureTableComponent } from './monitor-procedure-table.component';

describe('MonitorProcedureTableComponent', () => {
  let component: MonitorProcedureTableComponent;
  let fixture: ComponentFixture<MonitorProcedureTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorProcedureTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorProcedureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
