import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadPassportComponent } from './download-passport.component';

describe('DownloadPassportComponent', () => {
  let component: DownloadPassportComponent;
  let fixture: ComponentFixture<DownloadPassportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadPassportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
