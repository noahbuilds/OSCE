import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor-procedure',
  templateUrl: './monitor-procedure.component.html',
  styleUrls: ['./monitor-procedure.component.scss']
})
export class MonitorProcedureComponent implements OnInit {
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
