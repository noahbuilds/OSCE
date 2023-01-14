import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-mark-procedure",
  templateUrl: "./mark-procedure.component.html",
  styleUrls: ["./mark-procedure.component.scss"],
})
export class MarkProcedureComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  isFound: boolean = false;
  procedures: Array<any> = [
    {
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos ",
      grade: "",
      id: 1,
      maxScore: 1,
      
    },
    {
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos",
      grade: "",
      id: 2,
      maxScore: 0.5,
   
    },
    {
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos",
      grade: "",
      id: 3,
      maxScore: 0.25,
     
    },
    {
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias abbeatae sapiente fugiat nemo pariatur exercitationem ut dignissimos",
      grade: "",
      id: 4,
      maxScore: 1,
     
    },
  ];
  // grades: any = ["0", "1/4", "1/2", "1"];

  gradedDTO: any = [];
  gradedActivitiesId = [];
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Examiner" },
      { label: "Mark Procedure", active: true },
    ];
    this.setGradeList();
  }

  openMarkingGuide(content: any) {
    this.modalService.open(content, { size: "md", centered: true });
  }
  openGrader(content: any) {
    this.modalService.open(content, { size: "md", centered: true });
  }
  findCandidate() {
    this.isFound = !this.isFound;
  }
  cancel() {
    this.modalService.dismissAll();
  }

  grader(index: number, grade: string) {
    this.procedures[index].grade = grade;

    console.log(this.procedures);
  }

  setGradeList() {
    for (let i = 0; i < this.procedures.length; i++) {
      this.procedures[i].gradeList = [];
      if (this.procedures[i].maxScore === 1) {
        this.procedures[i].gradeList = ["0", "1/4", "1/2", "1"];
      } else if (this.procedures[i].maxScore === 0.5) {
        this.procedures[i].gradeList = ["0", "1/4", "1/2"];
      } else {
        this.procedures[i].gradeList = ["0", "1/4"];
      }
    }
  }
}
