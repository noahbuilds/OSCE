import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.scss']
})
export class StartExamComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Start exam', active: true },
    ];
  }

}
