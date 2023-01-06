import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorExamComponent } from './monitor-exam.component';

describe('MonitorExamComponent', () => {
  let component: MonitorExamComponent;
  let fixture: ComponentFixture<MonitorExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
