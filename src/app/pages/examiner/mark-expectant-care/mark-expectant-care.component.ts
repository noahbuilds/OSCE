import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mark-expectant-care',
  templateUrl: './mark-expectant-care.component.html',
  styleUrls: ['./mark-expectant-care.component.scss']
})
export class MarkExpectantCareComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Examiner' },
      { label: 'Mark Expectant care', active: true },
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
