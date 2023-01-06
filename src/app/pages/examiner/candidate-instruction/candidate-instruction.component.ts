import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-instruction',
  templateUrl: './candidate-instruction.component.html',
  styleUrls: ['./candidate-instruction.component.scss']
})
export class CandidateInstructionComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Examiner' },
      { label: 'Candidate instruction', active: true },
    ];
  }

}
