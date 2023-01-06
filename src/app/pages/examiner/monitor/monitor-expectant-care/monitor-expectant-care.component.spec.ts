import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorExpectantCareComponent } from './monitor-expectant-care.component';

describe('MonitorExpectantCareComponent', () => {
  let component: MonitorExpectantCareComponent;
  let fixture: ComponentFixture<MonitorExpectantCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorExpectantCareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorExpectantCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
