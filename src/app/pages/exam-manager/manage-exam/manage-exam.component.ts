import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-exam',
  templateUrl: './manage-exam.component.html',
  styleUrls: ['./manage-exam.component.scss']
})
export class ManageExamComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  constructor( private router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Manage exam', active: true },
    ];
  }

  allowRelogin(){
    this.router.navigate(['manager/manage-exam/allow-relogin'])
  }

  lookupCandidate(){
    this.router.navigate(['manager/manage-exam/candidate-lookup'])
  }
}
