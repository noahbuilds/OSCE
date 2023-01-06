import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifyByMatchingComponent } from './classify-by-matching.component';

describe('ClassifyByMatchingComponent', () => {
  let component: ClassifyByMatchingComponent;
  let fixture: ComponentFixture<ClassifyByMatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassifyByMatchingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifyByMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
