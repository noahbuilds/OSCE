import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expectant-care',
  templateUrl: './expectant-care.component.html',
  styleUrls: ['./expectant-care.component.scss']
})
export class ExpectantCareComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Monitor Expectant care', active: true },
    ];
  }

}
