import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateLookupComponent } from './candidate-lookup.component';

describe('CandidateLookupComponent', () => {
  let component: CandidateLookupComponent;
  let fixture: ComponentFixture<CandidateLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
