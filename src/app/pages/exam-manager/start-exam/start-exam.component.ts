import { Component, OnInit } from '@angular/core';
import { ManageVivaService } from '../services/manage-viva.service';
import { ManageOsceService } from '../services/manage-osce.service';
import { OsceModel } from '../models/osce.model';
import { Subscription } from 'rxjs';
import { VivaModel } from '../models/viva.model';

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
        }
      }
    )
  }

  getAvailableViva():Subscription{
    return this.vivaService.getAvailableViva().subscribe({
      next: (data:VivaModel)=>{
        this.vivaData = data
      }
    })
  }

  startVivaExam(examId: string):Subscription{
    return this.vivaService.startViva(examId).subscribe({
      next: (data: boolean)=>{
        this.isVivaOn =data
      }
    })
  }

  startOsceExam(examId:string): Subscription{
    return this.osceService.startOsce(examId).subscribe(
      {next: (data: boolean)=>{
        this.isOsceOn =data
      }}
    )
  }


}
