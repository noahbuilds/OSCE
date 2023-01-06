import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viva',
  templateUrl: './viva.component.html',
  styleUrls: ['./viva.component.scss']
})
export class VivaComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Monitor VIVA', active: true },
    ];
  }

}
