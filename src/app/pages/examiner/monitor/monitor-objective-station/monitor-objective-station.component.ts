import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor-objective-station',
  templateUrl: './monitor-objective-station.component.html',
  styleUrls: ['./monitor-objective-station.component.scss']
})
export class MonitorObjectiveStationComponent implements OnInit {
  programes: Array<any> = [

    {
      "name": "Operation",
      "started": 2,
      "total": 200
    },
    {
      "name": "Orthology",
      "started": 12,
      "total": 20
    },
    {
      "name": "Animalogy",
      "started": 13,
      "total": 20
    },
    {
      "name": "Zoology",
      "started": 200,
      "total": 100
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
