import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-procedure-instruction',
  templateUrl: './procedure-instruction.component.html',
  styleUrls: ['./procedure-instruction.component.scss']
})
export class ProcedureInstructionComponent implements OnInit {
breadCrumbItems!: Array<{}>;
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Examiner' },
      { label: 'View Procedure instruction', active: true },
    ];
  }

}
