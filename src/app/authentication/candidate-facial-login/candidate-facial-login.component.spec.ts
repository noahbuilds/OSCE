import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateFacialLoginComponent } from './candidate-facial-login.component';

describe('CandidateFacialLoginComponent', () => {
  let component: CandidateFacialLoginComponent;
  let fixture: ComponentFixture<CandidateFacialLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateFacialLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateFacialLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
