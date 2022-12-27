import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
  catId: any;
  cat: any;
  //  Set Category default value
  categories = [
    {
      cid: null,
      title: '',
      description: '',
    },
  ];

  //  Set quizzes default value
  quizzes = [
    {
      qId: null,
      title: '',
      description: '',
      maxMarks: '',
      numberOfQuestions: '',
      active: '',
      category: {
        cid: '',
        title: '',
      },
    },
  ];

  //  Constructor for QuizService
  constructor(
    private _quiz: QuizService,
    private _route: ActivatedRoute,
    private _category: CategoryService
  ) {}

  ngOnInit(): void {
    this.catId = this._route.snapshot.params['cid'];

    //  Load all the Categories
    this._category.getCategory(this.catId).subscribe(
      //  For Data
      (data: any) => {
        //  Get Category Data from the Backend
        this.categories = data;
        // console.log(this.categories);
        this.cat = this.categories;
      },
      //  For Error
      (error) => {
        // console.log(error);
        Swal.fire('Error !!', 'Error in Loading Subject', 'error');
      }
    );

    //  Load the active Quiz of Perticular Category
    this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
      //  For Data
      (data: any) => {
        //  Get Quiz Data from the Backend
        this.quizzes = data;
      },
      //  For Error
      (error) => {
        // console.log(error);
        Swal.fire('Error !!', 'Error in Loading Paper', 'error');
      }
    );
  }
}
