import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifyByOrderingComponent } from './classify-by-ordering.component';

describe('ClassifyByOrderingComponent', () => {
  let component: ClassifyByOrderingComponent;
  let fixture: ComponentFixture<ClassifyByOrderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassifyByOrderingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifyByOrderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
