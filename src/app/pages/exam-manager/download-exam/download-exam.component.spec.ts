import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadExamComponent } from './download-exam.component';

describe('DownloadExamComponent', () => {
  let component: DownloadExamComponent;
  let fixture: ComponentFixture<DownloadExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
