import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorObjectiveStationComponent } from './monitor-objective-station.component';

describe('MonitorObjectiveStationComponent', () => {
  let component: MonitorObjectiveStationComponent;
  let fixture: ComponentFixture<MonitorObjectiveStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorObjectiveStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorObjectiveStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
