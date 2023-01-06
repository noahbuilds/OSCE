import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-white-list',
  templateUrl: './white-list.component.html',
  styleUrls: ['./white-list.component.scss']
})
export class WhiteListComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'White List', active: true },
    ];
  }

}
