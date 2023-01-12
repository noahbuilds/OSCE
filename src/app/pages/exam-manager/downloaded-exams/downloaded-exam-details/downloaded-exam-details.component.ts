import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-downloaded-exam-details',
  templateUrl: './downloaded-exam-details.component.html',
  styleUrls: ['./downloaded-exam-details.component.scss']
})
export class DownloadedExamDetailsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  constructor(private ngbModalService: NgbModal) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manager' },
      { label: 'Downloaded Exams', active: true },
      { label: 'Details', active: true },
    ];
  }

  openAddProcedureModal(content: any){
    this.ngbModalService.open(content, { size: 'md', centered: true})
  }

}
