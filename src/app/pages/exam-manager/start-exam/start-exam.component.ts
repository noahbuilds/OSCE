import { Component, OnInit } from '@angular/core';
import { ManageVivaService } from '../services/manage-viva.service';
import { ManageOsceService } from '../services/manage-osce.service';
import { OsceModel } from '../models/osce.model';
import { Subscription } from 'rxjs';
import { VivaModel } from '../models/viva.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.scss']
})
export class StartExamComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  osceData: OsceModel;
  vivaData: VivaModel
  isVivaOn: boolean
  isOsceOn: boolean
  isOsceAvailable: boolean = false;
  isVivaAvailable: boolean = false;
  showVivaError = false;
  showOsceError = false;
  
  vivaErrorMessage: string
  osceErrorMessage: string
  
  startVivaErrorMessage: string;
  startOsceErrorMessage: string;
  showStartVivaErrorMessage =false
  showStartOsceErrorMessage =false

  constructor(private vivaService: ManageVivaService, private osceService: ManageOsceService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Start exam', active: true },
    ];
    this.getAvailableOsce();
    this.getAvailableViva();
  }

  getAvailableOsce(): Subscription{
    return this.osceService.getAvailableOsce().subscribe(
      {
        next: (data:OsceModel)=>{
         
          this.osceData = data
          this.isOsceAvailable = true
        },
        error: (err:HttpErrorResponse)=>{
          
          this.showOsceError = true;
          this.osceErrorMessage = err.error.message;
        },
        complete: ()=>{
          console.log(this.osceData)
        }
      }
    )
  }

  getAvailableViva():Subscription{
    return this.vivaService.getAvailableViva().subscribe({
      next: (data:VivaModel)=>{
        this.vivaData = data
        this.isVivaAvailable= true
      },
      complete:()=> {
        console.log(this.vivaData)
      },
      error : (err : HttpErrorResponse)=>{
        this.showVivaError =true
        this.vivaErrorMessage = err.error.message
      }
    })
  }

  startVivaExam(examId: string):Subscription{
    return this.vivaService.startViva(examId).subscribe({
      next: (data: boolean)=>{
        this.isVivaOn =data
      },
      complete: ()=>{
        console.log(this.isVivaOn)
      },
      error:(err:HttpErrorResponse)=>{
        this.startVivaErrorMessage = err.error.message
        this.showStartVivaErrorMessage = true
        console.log(err.error.message)
      }
    })
  }

  startOsceExam(examId:string): Subscription{
    return this.osceService.startOsce(examId).subscribe(
      {next: (data: boolean)=>{
        this.isOsceOn =data
      },
      error: (err: HttpErrorResponse)=>{
        this.startOsceErrorMessage =err.error.message;
        this.showStartOsceErrorMessage =true
      }},
      
      
    )
  }


}
