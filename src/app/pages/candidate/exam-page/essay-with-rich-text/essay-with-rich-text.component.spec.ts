import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssayWithRichTextComponent } from './essay-with-rich-text.component';

describe('EssayWithRichTextComponent', () => {
  let component: EssayWithRichTextComponent;
  let fixture: ComponentFixture<EssayWithRichTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EssayWithRichTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EssayWithRichTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
