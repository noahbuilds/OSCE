import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-osce',
  templateUrl: './osce.component.html',
  styleUrls: ['./osce.component.scss']
})
export class OsceComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  osce: Array<any> = [
    {},
    {},
    {},
    {},
    {},
    {},
  ]

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Monitor OSCE', active: true },
    ];
  }



}
