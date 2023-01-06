import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectantCareComponent } from './expectant-care.component';

describe('ExpectantCareComponent', () => {
  let component: ExpectantCareComponent;
  let fixture: ComponentFixture<ExpectantCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpectantCareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpectantCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
