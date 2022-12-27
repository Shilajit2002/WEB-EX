import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  //  Constructor for ActivatedRoute,QuizService,CategoryService
  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private router: Router
  ) {}

  //  Set the default value
  qId = 0;
  quiz: any;
  categories: any;

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    // alert(this.qId);

    //  get the Quiz/Paper Data
    this._quiz.getQuiz(this.qId).subscribe(
      //  For Data
      (data: any) => {
        this.quiz = data;
        // console.log(this.quiz);
      },
      //  For Error
      (error: any) => {
        // console.log(error);
        Swal.fire('Error !!', 'Error in Loading Data', 'error');
      }
    );

    //  get the Quiz/Paper Category Value
    this._cat.categories().subscribe(
      //  For Data
      (data: any) => {
        this.categories = data;
      },
      //  For Error
      (error) => {
        Swal.fire('Error !!', 'Error in Loading Data', 'error');
      }
    );
  }

  // Update Paper Submit
  public updatePaper() {
    // Declare Characters
    const Capital = /[A-Z]/g;
    const Small = /[a-z]/g;
    const Num = /[0-9]/g;
    const Special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

    // Check all fields are empty or not
    if (
      (this.quiz.title.trim() == '' || this.quiz.title == null) &&
      (this.quiz.description.trim() == '' || this.quiz.description == null) &&
      (this.quiz.maxMarks.trim() == '' || this.quiz.maxMarks == null) &&
      (this.quiz.numberOfQuestions.trim() == '' ||
        this.quiz.numberOfQuestions == null) &&
      (this.quiz.category.cid == '' || this.quiz.category.cid == null)
    ) {
      // Show alert
      this._snack.open('All fields are Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Check the title is empty or not
    else if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      // Show alert
      this._snack.open('Title is Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Check the description is empty or not
    else if (
      this.quiz.description.trim() == '' ||
      this.quiz.description == null
    ) {
      // Show alert
      this._snack.open('Description is Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Check the Max Marks is empty or not
    else if (
      (this.quiz.maxMarks.trim() == this.quiz.maxMarks) == null ||
      !this.quiz.maxMarks.match(Num) ||
      this.quiz.maxMarks.match(Capital) ||
      this.quiz.maxMarks.match(Small) ||
      this.quiz.maxMarks.match(Special)
    ) {
      // Show alert
      this._snack.open('Marks are Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Check the No Of Questions is empty or not
    else if (
      this.quiz.numberOfQuestions.trim() == '' ||
      this.quiz.numberOfQuestions == null ||
      !this.quiz.numberOfQuestions.match(Num) ||
      this.quiz.numberOfQuestions.match(Capital) ||
      this.quiz.numberOfQuestions.match(Small) ||
      this.quiz.numberOfQuestions.match(Special)
    ) {
      // Show alert
      this._snack.open('No Of Questions are Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Check the Category is Selected or Not
    else if (this.quiz.category.cid == '' || this.quiz.category.cid == null) {
      // Show alert
      this._snack.open('Please Select Category !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    // Validate Data
    this._quiz.updateQuiz(this.quiz).subscribe(
      //  For Data
      (data) => {
        //  Success Alert
        Swal.fire({
          icon: 'success',
          title: 'Paper is Updated',
          confirmButtonText: 'Ok',
        }).then((result) => {
          //  After Clicking Ok It will Redirect View Quizzes Page
          if (result.isConfirmed) {
            this.router.navigate(['admin/quizzes']);
          }
          //  If Not Clicking Ok also it will Redirect View Quizzes Page
          else {
            this.router.navigate(['admin/quizzes']);
          }
        });
      },
      //  For Error
      (error) => {
        Swal.fire('Error !!', 'Error While Updating Paper', 'error');
      }
    );
  }
}
