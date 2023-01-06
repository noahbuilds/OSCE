import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardChoiceComponent } from './standard-choice.component';

describe('StandardChoiceComponent', () => {
  let component: StandardChoiceComponent;
  let fixture: ComponentFixture<StandardChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
