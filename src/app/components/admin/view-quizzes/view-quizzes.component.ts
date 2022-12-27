import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
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

  // Questions Object
  questions = [
    {
      quiz: {
        qId: '',
      },
      quesId: null,
      content: String,
      image: String,
      option1: null,
      option2: null,
      option3: null,
      option4: null,
      answer: null,
    },
  ];

  //  Constructor for QuizService
  constructor(
    private _quiz: QuizService,
    private _question: QuestionService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      //  For data
      (data: any) => {
        //  Get quizzes from the Backend
        this.quizzes = data;
        // console.log(this.quizzes);

        this.quizzes.forEach((element) => {
          // console.log(element.qId)
          //  Get the Questions form backend database
          this._question.getQuestionsOfQuiz(element.qId).subscribe(
            //  For Data
            (data: any) => {
              this.questions = data;
              // console.log(this.questions);
            },
            //  For Error
            (error) => {
              // console.log(error);
            }
          );
        });
      },
      //  For Error
      (error) => {
        // console.log(error);
        Swal.fire('Error !!', 'Error in Loading Data', 'error');
      }
    );
  }

  // Delete Paper/Quiz
  deletePaper(qId: any) {
    let flag = true;

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        //  Check the Question data is null or not
        if (this.questions != null) {
          //  Iterate the Quesion Array
          this.questions.forEach((questionElem) => {
            //  Check any Question is available in this Quiz or not
            if (qId == questionElem.quiz.qId) {
              //  Show Alert
              this.snack.open(
                'Plz Delete all the Questions under this Paper',
                'ok',
                {
                  duration: 4000,
                }
              );
              flag = false;
              return;
            }
          });
        }

        if (flag == true) {
          this._quiz.deleteQuiz(qId).subscribe(
            (data: any) => {
              // Reload the page after deleting
              window.location.reload();
              // Filter the Quizzes which is not in the Database with their Id
              this.quizzes = this.quizzes.filter(
                (quiz: any) => quiz.qid != qId
              );
              // console.log("Deleted");
            },
            (error) => {
              Swal.fire('Error !!', 'Error While Deleting Data', 'error');
            }
          );
        }
      }
    });
  }
}

// this.questions.forEach((questionElem) => {
//   if (qId == questionElem.quiz.qId) {
//     this._question.deleteQuestion(questionElem.quesId).subscribe(
//       (data: any) => {
//         // Reload the page after deleting
//         // window.location.reload();
//         // Filter the Question which is not in the Database with their Id
//         this.questions = this.questions.filter(
//           (question: any) => question.quesId != questionElem.quesId
//         );
//         // console.log("Deleted");
//       },
//       (error) => {
//         // Swal
//         //   .fire
//         // 'Error !!',
//         // 'Error While Deleting Question',
//         // 'error'
//         //   ();
//       }
//     );
//   }
// });
