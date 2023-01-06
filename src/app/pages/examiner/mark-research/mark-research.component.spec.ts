import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkResearchComponent } from './mark-research.component';

describe('MarkResearchComponent', () => {
  let component: MarkResearchComponent;
  let fixture: ComponentFixture<MarkResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkResearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
