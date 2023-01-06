import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {



  constructor(private primeNGConfig: PrimeNGConfig) {}
  
 
  ngOnInit(): void {
    
    this.primeNGConfig.ripple = true;
  }
  currentPaper = 'Section 1';
  papers = [
    'Section 1' ,
     'Section 2' ,
     'Section 3' ,
  ];
}