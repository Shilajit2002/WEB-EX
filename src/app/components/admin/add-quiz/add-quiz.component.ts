import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  // Set Categories Array Object with Null
  categories = [
    {
      cid: null,
      title: '',
    },
  ];

  //  Set Quiz Object
  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: false,
    category: {
      cid: '',
    },
  };

  //  Constructor for Matsnack bar & category service & quiz service & Router
  constructor(
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private _quiz: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // For Loading the Category Data
    this._cat.categories().subscribe(
      // For Data
      (data: any) => {
        // Categories Load Successfully
        this.categories = data;
        // console.log(this.categories);
      },
      // For Error
      (error) => {
        // console.log(error);
        Swal.fire('Error !!', 'Error in Loading Data', 'error');
      }
    );
  }

  // AddTopic/Quiz Function
  addTopic() {
    // Declare Characters
    const Capital = /[A-Z]/g;
    const Small = /[a-z]/g;
    const Num = /[0-9]/g;
    const Special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

    // Check all fields are empty or not
    if (
      (this.quizData.title.trim() == '' || this.quizData.title == null) &&
      (this.quizData.description.trim() == '' ||
        this.quizData.description == null) &&
      (this.quizData.maxMarks.trim() == '' || this.quizData.maxMarks == null) &&
      (this.quizData.numberOfQuestions.trim() == '' ||
        this.quizData.numberOfQuestions == null) &&
      (this.quizData.category.cid == '' || this.quizData.category.cid == null)
    ) {
      // Show alert
      this._snack.open('All fields are Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Check the title is empty or not
    else if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      // Show alert
      this._snack.open('Title is Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Check the description is empty or not
    else if (
      this.quizData.description.trim() == '' ||
      this.quizData.description == null
    ) {
      // Show alert
      this._snack.open('Description is Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Check the Max Marks is empty or not
    else if (
      this.quizData.maxMarks.trim() == '' ||
      this.quizData.maxMarks == null ||
      !this.quizData.maxMarks.match(Num) ||
      this.quizData.maxMarks.match(Capital) ||
      this.quizData.maxMarks.match(Small) ||
      this.quizData.maxMarks.match(Special)
    ) {
      // Show alert
      this._snack.open('Marks are Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Check the No Of Questions is empty or not
    else if (
      this.quizData.numberOfQuestions.trim() == '' ||
      this.quizData.numberOfQuestions == null ||
      !this.quizData.numberOfQuestions.match(Num) ||
      this.quizData.numberOfQuestions.match(Capital) ||
      this.quizData.numberOfQuestions.match(Small) ||
      this.quizData.numberOfQuestions.match(Special)
    ) {
      // Show alert
      this._snack.open('No Of Questions are Required !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Check the Category is Selected or Not
    else if (
      this.quizData.category.cid == '' ||
      this.quizData.category.cid == null
    ) {
      // Show alert
      this._snack.open('Please Select Category !!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //  Call Server
    this._quiz.addQuiz(this.quizData).subscribe(
      // For Data
      (data: any) => {
        //  Success Alert
        Swal.fire({
          icon: 'success',
          title: 'Paper is Added',
          confirmButtonText: 'Ok',
        }).then((result) => {
          //  After Clicking Ok It will Redirect View Quizzes Page
          if (result.isConfirmed) {
            this.router.navigate(['admin/quizzes']);
          }
          //  Ig Not Clicking Ok also it will Redirect View Quizzes Page
          else {
            this.router.navigate(['admin/quizzes']);
          }
        });
      },
      // For Error
      (error) => {
        // Show Error Message
        Swal.fire('Error!!', 'Error While Adding Paper', 'error');
      }
    );
  }
}
