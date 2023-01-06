import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowReloginComponent } from './allow-relogin.component';

describe('AllowReloginComponent', () => {
  let component: AllowReloginComponent;
  let fixture: ComponentFixture<AllowReloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllowReloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowReloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
