import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  template: `
    <ckeditor
      [(ngModel)]="ckeditorContent"
      [config]="{ uiColor: '#99000' }"
      [readonly]="false"
      (change)="onChange($event)"
      (editorChange)="onEditorChange($event)"
      (ready)="onReady($event)"
      (focus)="onFocus($event)"
      (blur)="onBlur($event)"
      (contentDom)="onContentDom($event)"
      (fileUploadRequest)="onFileUploadRequest($event)"
      (fileUploadResponse)="onFileUploadResponse($event)"
      (paste)="onPaste($event)"
      (drop)="onDrop($event)"
      debounce="500"
    >
    </ckeditor>
  `,
  styleUrls: ['./update-question.component.css'],
})
export class UpdateQuestionComponent implements OnInit {
  //  Quiz Data
  qId: any;
  qTitle: any;
  //  Question Data
  question = {
    quesId: '',
    quiz: {
      qId: '',
    },
    content: '',
    image: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  // Constructor
  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quesId = this._route.snapshot.params['quesId'];

    //  get the question Data
    this._question.getQuestion(this.question.quesId).subscribe(
      //  For Data
      (data: any) => {
        this.question = data;
      },
      //  For Error
      (error: any) => {
        // console.log(error);
        Swal.fire('Error !!', 'Error in Loading Data', 'error');
      }
    );
  }

  //  Question Update
  updateQuestion() {
    // alert("Hello");

    //  Check all fileds are empty or not
    if (
      (this.question.content.trim() == '' ||
        this.question.content == null ||
        this.question.content == '') &&
      (this.question.option1.trim() == '' ||
        this.question.option1 == null ||
        this.question.option1 == '') &&
      (this.question.option2.trim() == '' ||
        this.question.option2 == null ||
        this.question.option2 == '') &&
      (this.question.option3.trim() == '' ||
        this.question.option3 == null ||
        this.question.option3 == '') &&
      (this.question.option4.trim() == '' ||
        this.question.option4 == null ||
        this.question.option4 == '') &&
      (this.question.answer == null || this.question.answer == '')
    ) {
      //  Show alert
      this.snack.open('All fields are Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Check the content is empty or not
    else if (
      this.question.content.trim() == '' ||
      this.question.content == null ||
      this.question.content == ''
    ) {
      //  Show alert
      this.snack.open('Content is Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Check the option1 is empty or not
    else if (
      this.question.option1.trim() == '' ||
      this.question.option1 == null ||
      this.question.option1 == ''
    ) {
      //  Show alert
      this.snack.open('Option1 is Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Check the option2 is empty or not
    else if (
      this.question.option2.trim() == '' ||
      this.question.option2 == null ||
      this.question.option2 == ''
    ) {
      //  Show alert
      this.snack.open('Option2 is Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Check the option3 is empty or not
    else if (
      this.question.option3.trim() == '' ||
      this.question.option3 == null ||
      this.question.option3 == ''
    ) {
      //  Show alert
      this.snack.open('Option3 is Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Check the option4 is empty or not
    else if (
      this.question.option4.trim() == '' ||
      this.question.option4 == null ||
      this.question.option4 == ''
    ) {
      //  Show alert
      this.snack.open('Option4 is Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Check the answer is selected or not
    else if (this.question.answer == null || this.question.answer == '') {
      //  Show alert
      this.snack.open('Answer is Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Submit
    this._question.updateQuestion(this.question).subscribe(
      //  For data
      (data: any) => {
        //  Success Alert
        Swal.fire({
          icon: 'success',
          title: 'Question is Updated',
          confirmButtonText: 'Ok',
        }).then((result) => {
          //  After Clicking Ok It will Redirect View Question Page
          if (result.isConfirmed) {
            this.router.navigate([
              '/admin/view-questions/' + this.qId + '/' + this.qTitle,
            ]);
          }
          //  Ig Not Clicking Ok also it will Redirect View Question Page
          else {
            this.router.navigate([
              '/admin/view-questions/' + this.qId + '/' + this.qTitle,
            ]);
          }
        });
      },
      (error) => {
        Swal.fire('Error', 'Error While Updating Question', 'error');
      }
    );
  }
}
