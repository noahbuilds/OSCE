import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mark-viva',
  templateUrl: './mark-viva.component.html',
  styleUrls: ['./mark-viva.component.scss']
})
export class MarkVivaComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  constructor( private modalService: NgbModal) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Examiner' },
      { label: 'Mark VIVA', active: true },
    ];
  }
  openMarkingGuide(content: any) {
    this.modalService.open(content, { size: 'md', centered: true });
  }
  openGrader(content:any){
    this.modalService.open(content, { size: 'md', centered: true })
  }

  cancel(){
    this.modalService.dismissAll()
  }
}
