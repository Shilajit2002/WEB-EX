import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  qid: any;
  quiz: any;
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
    public login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];

    //  Load Particular Quiz by Quiz Id
    this._quiz.getQuiz(this.qid).subscribe(
      //  For Data
      (data: any) => {
        //  Get Quiz Data from the Backend
        this.quizzes = data;
        this.quiz = this.quizzes;
      },
      //  For Error
      (error) => {
        // console.log(error);
        Swal.fire('Error !!', 'Error in Loading Paper', 'error');
      }
    );
  }

  startQuiz() {
    Swal.fire({
      title: 'Do you want to Start the Exam?',
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      showDenyButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/start/' + this.qid]);
      }
    });
  }
}
