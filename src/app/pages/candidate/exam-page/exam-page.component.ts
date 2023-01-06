import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  HostListener,
} from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import Swal from "sweetalert2";
import { TimeService } from "../services/time.service";
import { ItemService } from "../services/item.service";
import { ItemType } from "src/app/shared/enum/itemTypes";
import { ItemModel } from "src/app/shared/model/itemModel";
import { TrueOrFalseComponent } from "./true-or-false/true-or-false.component";
import { StandardChoiceComponent } from "./standard-choice/standard-choice.component";
import { MultipleResponseComponent } from "./multiple-response/multiple-response.component";
import { ClozeWithDropDownComponent } from "./cloze-with-drop-down/cloze-with-drop-down.component";
import { ClozeWithTextComponent } from "./cloze-with-text/cloze-with-text.component";
import { EssayWithRichTextComponent } from "./essay-with-rich-text/essay-with-rich-text.component";
import { EssayWithShortTextComponent } from "./essay-with-short-text/essay-with-short-text.component";
import { ClassifyByMatchingComponent } from "./classify-by-matching/classify-by-matching.component";
import { ClassifyByOrderingComponent } from "./classify-by-ordering/classify-by-ordering.component";
import { Underline } from "angular-feather/icons";

@Component({
  selector: "app-exam-page",
  templateUrl: "./exam-page.component.html",
  styleUrls: ["./exam-page.component.scss"],
})
export class ExamPageComponent implements OnInit, OnDestroy {
  timeLeft: number = 10;
  timerSub: Subscription;
  item: ItemModel;
  currentQuestionNumber: number = 0;
  currentQuestion: ItemModel;
  itemTypes = ItemType;
  itemsLength: number;
  displaySplit: boolean = false;
  keyPressed: string = "";
  isFirstQuestionNumber: boolean;
  isLastQuestionNumber: boolean;
  shortcutKeys: string[] = ["a", "b", "c", "d"];
  attemptedQuestions: any[] = [];
  // @ViewChildren(NgModel) modelRefList: QueryList<NgModel>;
  @ViewChild(TrueOrFalseComponent)
  trueFalseRef!: TrueOrFalseComponent;
  @ViewChild(StandardChoiceComponent)
  standardChoiceRef!: StandardChoiceComponent;
  @ViewChild(MultipleResponseComponent)
  multipleResponseRef!: MultipleResponseComponent;
  @ViewChild(ClozeWithDropDownComponent)
  clozeWithDropDownRef!: ClozeWithDropDownComponent;
  @ViewChild(ClozeWithTextComponent)
  clozeWithtextRef!: ClozeWithTextComponent;
  @ViewChild(EssayWithRichTextComponent)
  essayWithRichTextRef!: EssayWithRichTextComponent;
  @ViewChild(EssayWithShortTextComponent)
  essayWithShortTextRef!: EssayWithShortTextComponent;
  @ViewChild(ClassifyByMatchingComponent)
  classifyByMatchingRef!: ClassifyByMatchingComponent;
  @ViewChild(ClassifyByOrderingComponent)
  classifyByOrderingRef!: ClassifyByOrderingComponent;

  @HostListener("document:keypress", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keyPressed = event.key;
    //shortCuts
    //shortcut not to work with short text ,rich text and cloze text
    if (
      this.currentQuestion.itemType != ItemType.RICH_ESSAY &&
      this.currentQuestion.itemType != ItemType.SHORT_ESSAY &&
      this.currentQuestion.itemType != ItemType.CLOZE_TEXT
    ) {
      this.useShortcut();
    }
  }
  constructor(
    private router: Router,
    private timeService: TimeService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    // this.timerSub = this.timeService.startTimer().subscribe({
    //   next: (val) => {
    //     // console.log(val + '' + 'Countdown')
    //     // console.log(--this.timeLeft);
    //     --this.timeLeft
    //   },
    //   complete: () => {
    //     this.endExam();
    //     Swal.fire({
    //       title: "Exam submitted!",
    //       text: "You ran out of time.",
    //       confirmButtonColor: "rgb(3, 142, 220)",
    //       icon: "info",
    //     });
    //   },
    // });
    // this.itemTypes = itemType;
    this.itemsLength = this.itemService.getItems().length;
    this.setCurrentQuestionNumber();
    this.getCurrentQuestion();

    // this.currentQuestion =this.itemService.getCurrentQuestion()
  }

  confirm(): void {
    Swal.fire({
      title: "Are you sure you want to end this exam?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(3, 142, 220)",
      cancelButtonColor: "rgb(243, 78, 78)",
      confirmButtonText: "Yes, end exam!",
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: "Exam submitted!",
          text: "You have submitted successfully.",
          confirmButtonColor: "rgb(3, 142, 220)",
          icon: "success",
        });
        this.endExam();
      }
    });
  }

  endExam(): void {
    this.ngOnDestroy();
    this.router.navigate(["candidate/end-exam"]);
  }

  ngOnDestroy(): void {
    // this.timerSub.unsubscribe();
    // console.log("i have been destroyed");
  }

  nextQuestion(): void {
    let currentQuestion = this.itemService.getCurrentQuestion();
    //console.log(currentQuestion);
    this.getCurrentQuestionResponse(currentQuestion);

    // check to current question and next question type to know if they are the same type so as to reinitialize component
    if (
      this.getCurrentQuestion().answers.length != 0 &&
      !this.getCurrentQuestion().answers.includes(undefined) &&
      !this.attemptedQuestions.includes(
        this.setCurrentQuestionNumber().toString()
      )
    ) {
      this.attemptedQuestions.push(this.setCurrentQuestionNumber().toString());
      console.log("i have been attempted" + this.getCurrentQuestion().stimulus);
      console.log(this.getCurrentQuestion().answers);
    }
    // console.log(this.attemptedQuestions)
    this.checkItemType("nextQuestion");
    // if (
    //  this.checkItemType("nextQuestion")
    // ) {
    //   console.log("we are the same type");
    //   this.callNgOnInit(); //reinitialize component
    // } else {
    //   this.setCurrentQuestionNumber();
    //   this.getCurrentQuestion();
    //   console.log("we are not the same type");
    // }

    //console.log(this.currentQuestion);
    //this.nextQuestion()

    //  this.modelRefList.forEach((element)=>{
    //   console.log( element)
    //  })
  }

  previousQuestion(): void {
    let currentQuestion = this.itemService.getCurrentQuestion();
    this.getCurrentQuestionResponse(currentQuestion);

    // check to current question and previous question type to know if they are the same type so as to reinitialize component

    this.checkItemType("previousQuestion");

    // console.log("we are the same type");
    // this.callNgOnInit(); //reinitialize component
    // } else {
    // this.setCurrentQuestionNumber();
    // this.getCurrentQuestion();

    console.log("we are not the same type");
  }

  getCurrentQuestionResponse(item: ItemModel) {
    console.log(item);
  }

  getCurrentQuestion(): ItemModel {
    return (this.currentQuestion = this.itemService.getCurrentQuestion());
  }

  callNgOnInit(): void {
    // check for the type of component to know which ngOnInit to caal

    if (this.itemService.getCurrentQuestion().itemType == ItemType.TRUE_FALSE) {
      this.trueFalseRef.ngOnInit();
      //set the current question number
      this.setCurrentQuestionNumber();
    } else if (this.itemService.getCurrentQuestion().itemType == ItemType.MCQ) {
      this.standardChoiceRef.ngOnInit();
      this.setCurrentQuestionNumber();
    } else if (this.itemService.getCurrentQuestion().itemType == ItemType.MRQ) {
      this.multipleResponseRef.ngOnInit();
      this.setCurrentQuestionNumber();
    } else if (
      this.itemService.getCurrentQuestion().itemType == ItemType.RICH_ESSAY
    ) {
      this.essayWithRichTextRef.ngOnInit();
      this.setCurrentQuestionNumber();
    } else if (
      this.itemService.getCurrentQuestion().itemType == ItemType.SHORT_ESSAY
    ) {
      this.essayWithShortTextRef.ngOnInit();
      this.setCurrentQuestionNumber();
    } else if (
      this.itemService.getCurrentQuestion().itemType == ItemType.ORDERING
    ) {
      this.classifyByOrderingRef.ngOnInit();
      this.setCurrentQuestionNumber();
    } else if (
      this.itemService.getCurrentQuestion().itemType == ItemType.MATCHING
    ) {
      this.classifyByMatchingRef.ngOnInit();
      this.setCurrentQuestionNumber();
    } else if (
      this.itemService.getCurrentQuestion().itemType == ItemType.CLOZE_TEXT
    ) {
      this.clozeWithtextRef.ngOnInit();
      this.setCurrentQuestionNumber();
    } else if (
      this.itemService.getCurrentQuestion().itemType == ItemType.CLOZE_DROPDOWN
    ) {
      this.clozeWithDropDownRef.ngOnInit();
      this.setCurrentQuestionNumber();
    }
  }

  setCurrentQuestionNumber(): number {
    return (this.currentQuestionNumber =
      this.itemService.currentQuestionNumber);
  }

  changeDisplay(): boolean {
    return (this.displaySplit = !this.displaySplit);
  }

  useShortcut(): void {
    if (this.currentQuestionNumber != 0) {
      switch (this.keyPressed.toLowerCase()) {
        case "p":
          this.previousQuestion();
          break;
      }
    }
    if (this.currentQuestionNumber + 1 != this.itemsLength) {
      switch (this.keyPressed.toLowerCase()) {
        case "n":
          this.nextQuestion();
          break;
      }
    }

    if (this.getCurrentQuestion().itemType === this.itemTypes.MRQ) {
      for (let i = 0; i < this.shortcutKeys.length; i++) {
        switch (this.keyPressed.toLowerCase()) {
          case `${this.shortcutKeys[i]}`:
            this.multipleResponseRef.optionClicked(`${i + 1}`.toString());
            break;
        }
        // case "b":
        //   this.multipleResponseRef.optionClicked("2");
        //   break;
        // case "c":
        //   this.multipleResponseRef.optionClicked("3");
        //   break;
        // case "d":
        //   this.multipleResponseRef.optionClicked("4");
        //   break;
      }
    } else if (this.getCurrentQuestion().itemType === this.itemTypes.MCQ) {
      for (let i = 0; i < this.shortcutKeys.length; i++) {
        switch (this.keyPressed.toLowerCase()) {
          case `${this.shortcutKeys[i]}`:
            this.getCurrentQuestion().answers[0] = `${i + 1}`.toString();
            break;
          // case "b":
          //   this.getCurrentQuestion().answers[0] = "2";
          //   break;
          // case "c":
          //   this.getCurrentQuestion().answers[0] = "3";
          //   break;
          // case "d":
          //   this.getCurrentQuestion().answers[0] = "4";
          //   break;
        }
      }
    } else {
      //Exclude the last two shortcut keys for true-false itemType
      for (let i = 0; i < this.shortcutKeys.length - 2; i++) {
        switch (this.keyPressed.toLowerCase()) {
          case `${this.shortcutKeys[i]}`:
            this.getCurrentQuestion().answers[0] = `${i + 1}`.toString();
            break;
          // this.getCurrentQuestion().answers[0] = "2";
          // break;
        }
      }
    }
  }

  checkItemType(reference: string): void {
    switch (reference) {
      case "nextQuestion":
        if (
          this.itemService.getCurrentQuestion().itemType ==
          this.itemService.getNextQuestionItemType()
        ) {
          this.callNgOnInit();
        } else {
          this.setCurrentQuestionNumber();
          this.getCurrentQuestion();
        }
        break;
      case "previousQuestion":
        if (
          this.itemService.getCurrentQuestion().itemType ==
          this.itemService.getPreviousQuestionItemType()
        ) {
          this.callNgOnInit();
        } else {
          this.setCurrentQuestionNumber();
          this.getCurrentQuestion();
        }

        break;
    }
  }
}
