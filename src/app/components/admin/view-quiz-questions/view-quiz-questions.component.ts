import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css'],
})
export class ViewQuizQuestionsComponent implements OnInit {
  //  Quiz Id and Title
  qId: any;
  qTitle: any;
  // Questions Object
  questions = [
    {
      quesId: null,
      content: String,
      image: String,
      option1: null,
      option2: null,
      option3: null,
      option4: null,
      answer: null,
      //  For String to Html Code convert
      htmlStr: '',
    },
  ];

  //  Constructor
  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    //  Get the Questions form backend database
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      //  For Data
      (data: any) => {
        // console.log(data);
        this.questions = data;

        //  Set the content string in htmlStr as HTML code
        for (let index = 0; index < this.questions.length; index++) {
          this.questions[index].htmlStr = `${index + 1}. ${
            this.questions[index].content
          }`;
        }
      },
      //  For Error
      (error) => {
        Swal.fire('Error', 'Error in Loading Questions', 'error');
      }
    );
  }

  //  Delete Question
  deleteQuestion(qid: any) {
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
        this._question.deleteQuestion(qid).subscribe(
          (data: any) => {
            // Reload the page after deleting
            window.location.reload();
            // Filter the Question which is not in the Database with their Id
            this.questions = this.questions.filter(
              (question: any) => question.quesId != qid
            );
            // console.log("Deleted");
          },
          (error) => {
            Swal.fire('Error !!', 'Error While Deleting Question', 'error');
          }
        );
      }
    });
  }

  // Delete All Question
  deleteAllQuestion() {
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
        this.questions.forEach((value) => {
          this._question.deleteQuestion(value.quesId).subscribe(
            (data: any) => {
              // Reload the page after deleting
              window.location.reload();
              // Filter the Question which is not in the Database with their Id
              this.questions = this.questions.filter(
                (question: any) => question.quesId != value.quesId
              );
              // console.log("Deleted");
            },
            (error) => {
              Swal.fire('Error !!', 'Error While Deleting Question', 'error');
            }
          );
        });
      }
    });
  }
}
