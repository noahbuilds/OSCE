import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-candidate-exams',
  templateUrl: './list-candidate-exams.component.html',
  styleUrls: ['./list-candidate-exams.component.scss']
})
export class ListCandidateExamsComponent implements OnInit {
  exams: Array<any> = [
    {
      "name": "Examination 1",
      "duration": "60mins",
      "code": "MNCN03"
    },
    {
      "name": "Examination 2",
      "duration": "60mins",
      "code": "MNCN04"
      
    }, {
      "name": "Examination 3",
      "duration": "25mins",
      "code": "MNCN01"
    }
    , {
      "name": "Examination 4",
      "duration": "20mins",
      "code": "MNCN06"
    }, {
      "name": "Examination 5",
      "duration": "30mins",
      "code": "MNCN09"
    },
  ]
  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  startExam(){
    this.router.navigate(['candidate/exam'])
  }

}
