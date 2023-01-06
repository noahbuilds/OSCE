import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClozeWithDropDownComponent } from './cloze-with-drop-down.component';

describe('ClozeWithDropDownComponent', () => {
  let component: ClozeWithDropDownComponent;
  let fixture: ComponentFixture<ClozeWithDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClozeWithDropDownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClozeWithDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
