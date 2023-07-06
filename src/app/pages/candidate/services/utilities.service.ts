import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  isExamStarted :boolean = false;
  isExamEnded : boolean = false
  
  constructor() { }
}
