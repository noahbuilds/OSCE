import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mark-procedure',
  templateUrl: './mark-procedure.component.html',
  styleUrls: ['./mark-procedure.component.scss']
})
export class MarkProcedureComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  isFound: boolean = false
  activities: Array<string> = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos',
  ];

  procedures: Array<any> = [
    {
      name:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos ',
      grade: ''
    },
    {
      name:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos',
      grade: ''
    },
    {
      name:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos',
      grade: ''
    },
    {
      name:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos',
      grade: ''
    }
  ]
  grades: any = ['0','1/4', '1/2', '1'];
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Examiner' },
      { label: 'Mark Procedure', active: true },
    ];
  }

  openMarkingGuide(content:any){
    this.modalService.open(content, { size: 'md', centered: true })
  }
  openGrader(content:any){
    this.modalService.open(content, { size: 'md', centered: true })
  }
  findCandidate() {
    this.isFound = !this.isFound
    // this.foundCandidate = this.candidateDetails.isFound;
    
  }
  cancel(){
    this.modalService.dismissAll()
  }
}
