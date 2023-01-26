import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  osceStarted :boolean = false;
  vivaStarted: boolean = false;

  constructor() { }
}
