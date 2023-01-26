import { Injectable } from '@angular/core';
import {  Subscription, timer } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TimeService {

  timerSub$ : Subscription
  constructor() { }


  startTimer(){
    this.timerSub$ = timer(0, 30000).subscribe(
  (value)=>{

  }
    )

}

}