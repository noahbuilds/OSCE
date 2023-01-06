import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkExpectantCareComponent } from './mark-expectant-care.component';

describe('MarkExpectantCareComponent', () => {
  let component: MarkExpectantCareComponent;
  let fixture: ComponentFixture<MarkExpectantCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkExpectantCareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkExpectantCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
