import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClozeWithTextComponent } from './cloze-with-text.component';

describe('ClozeWithTextComponent', () => {
  let component: ClozeWithTextComponent;
  let fixture: ComponentFixture<ClozeWithTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClozeWithTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClozeWithTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
