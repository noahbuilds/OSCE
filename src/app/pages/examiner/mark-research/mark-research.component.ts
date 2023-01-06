import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mark-research',
  templateUrl: './mark-research.component.html',
  styleUrls: ['./mark-research.component.scss']
})
export class MarkResearchComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Examiner' },
      { label: 'Mark Research', active: true },
    ];
  }

  openMarkingGuide(content:any){
    this.modalService.open(content, { size: 'md', centered: true })
  }
  openGrader(content:any){
    this.modalService.open(content, { size: 'md', centered: true })
  }

  cancel(){
    this.modalService.dismissAll()
  }
}
