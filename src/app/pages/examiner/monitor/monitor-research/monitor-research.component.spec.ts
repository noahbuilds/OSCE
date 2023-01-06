import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorResearchComponent } from './monitor-research.component';

describe('MonitorResearchComponent', () => {
  let component: MonitorResearchComponent;
  let fixture: ComponentFixture<MonitorResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorResearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
