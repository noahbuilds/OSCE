import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssayWithShortTextComponent } from './essay-with-short-text.component';

describe('EssayWithShortTextComponent', () => {
  let component: EssayWithShortTextComponent;
  let fixture: ComponentFixture<EssayWithShortTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EssayWithShortTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EssayWithShortTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
