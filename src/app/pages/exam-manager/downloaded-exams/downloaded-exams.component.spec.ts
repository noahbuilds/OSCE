import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadedExamsComponent } from './downloaded-exams.component';

describe('DownloadedExamsComponent', () => {
  let component: DownloadedExamsComponent;
  let fixture: ComponentFixture<DownloadedExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadedExamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadedExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
