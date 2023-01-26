import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable, Subscription } from 'rxjs';
import { IpModel } from '../models/ip.model';
import { ResourceCreated } from '../models/resource.created';
import { IpService } from '../services/ip.service';

@Component({
  selector: 'app-white-list',
  templateUrl: './white-list.component.html',
  styleUrls: ['./white-list.component.scss']
})
export class WhiteListComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  IPs: string[];
  payload: IpModel
  resourceCreated: ResourceCreated
constructor(private ipService: IpService, private readonly notifierService: NotifierService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'White List', active: true },
    ];

    this.getIPs();
  }

  getIPs():Subscription{
    return this.ipService.getIPs().subscribe(
      {next: (data: string[])=>{
        this.IPs =data
      },
      error: (err: HttpErrorResponse)=>{
        console.log(err.error.message)
      }
    }
    )
  }

captureIP(ip:string){
  this.payload = {
    ip: ip
  }
 

  this.addIP(this.payload)
}

  addIP(payload: IpModel):Subscription{
    
    return this.ipService.addIP(payload).subscribe(
      {
        next: (data: ResourceCreated)=>{
        this.resourceCreated = data
       
      },
      error : (err: HttpErrorResponse)=>{
        console.log(err.message)
        this.notifierService.notify('error',err.error.message)

      },
      complete: ()=> {
        if(payload.ip == ''){
          this.notifierService.notify('error', `Please provide an IP address`)
         }
         else{
          this.notifierService.notify('success',`${payload.ip} added successfully`)
          this.getIPs()
         }
        
      },
    }
    )
  }

}
