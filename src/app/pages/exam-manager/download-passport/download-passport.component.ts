import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PassportService } from '../services/passport.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-download-passport',
  templateUrl: './download-passport.component.html',
  styleUrls: ['./download-passport.component.scss']
})
export class DownloadPassportComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  processingDownloadPassport : boolean = false
  constructor(private passportService: PassportService, private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Download Passport', active: true },
    ];
  }


  downloadPassport(){
    this.processingDownloadPassport = true
    this.passportService.downloadPassport().subscribe({
      next:(value)=> {
        this.notifierService.notify('success', 'Passport Downloaded successfully')
        this.processingDownloadPassport = false
      },
      error:(err: HttpErrorResponse)=> {
        this.notifierService.notify('error', err.error.message)
        this.processingDownloadPassport = false
      },
    })  
  }
}
