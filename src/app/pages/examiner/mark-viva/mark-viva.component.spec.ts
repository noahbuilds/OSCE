import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkVivaComponent } from './mark-viva.component';

describe('MarkVivaComponent', () => {
  let component: MarkVivaComponent;
  let fixture: ComponentFixture<MarkVivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkVivaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkVivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
