import { Injectable } from '@angular/core';
import { interval } from "rxjs";
import { take } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }


  startTimer(){
    const timerInterval$ = interval(1000); //1s
    let examTime = 10;
    // const timer$ = timer(30000); //30s
    return timerInterval$.pipe(take(examTime));
   
  }

}

