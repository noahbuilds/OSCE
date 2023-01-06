import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorVivaComponent } from './monitor-viva.component';

describe('MonitorVivaComponent', () => {
  let component: MonitorVivaComponent;
  let fixture: ComponentFixture<MonitorVivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorVivaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorVivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
