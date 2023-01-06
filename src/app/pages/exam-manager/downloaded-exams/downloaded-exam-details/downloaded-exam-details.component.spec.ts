import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadedExamDetailsComponent } from './downloaded-exam-details.component';

describe('DownloadedExamDetailsComponent', () => {
  let component: DownloadedExamDetailsComponent;
  let fixture: ComponentFixture<DownloadedExamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadedExamDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadedExamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
