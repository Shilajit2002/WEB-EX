import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
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
      qId: '',
      title: '',
      description: '',
      maxMarks: '',
      numberOfQuestions: '',
      active: '',
      category: {
        cid: null,
        title: '',
      },
    },
  ];

  // Set questions default value
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

  //  Constructor for CategoryService , QuizService , QuestionService , MatSnackBar
  constructor(
    private _category: CategoryService,
    private _quiz: QuizService,
    private _question: QuestionService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    //  Load all the Categories
    this._category.categories().subscribe(
      //  For Data
      (data: any) => {
        //  Get Category Data from the Backend
        this.categories = data;
        // console.log(this.categories);
      },
      //  For Error
      (error) => {
        // console.log(error);
        Swal.fire('Error !!', 'Error in Loading Data', 'error');
      }
    );

    //  Load all the Quizzes
    this._quiz.quizzes().subscribe(
      //  For data
      (data: any) => {
        //  Get quizzes from the Backend
        this.quizzes = data;
        // console.log(this.quizzes);

        //  Load all the Questions Using Quiz Id
        // this.quizzes.forEach((element) => {
        //   // console.log(element.qId)

        //   //  Get the Questions form backend database
        //   this._question.getQuestionsOfQuiz(element.qId).subscribe(
        //     //  For Data
        //     (data: any) => {
        //       this.questions = data;
        //       // console.log(this.questions);
        //     },
        //     //  For Error
        //     (error) => {
        //       // console.log(error);
        //     }
        //   );
        // });
      },
      //  For Error
      (error) => {
        // console.log(error);
      }
    );
  }

  // Delete Category / Subject
  deleteSubject(cid: any) {
    let flag = true;

    //  Show Alert
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
        //  Check the Quiz data is null or not
        if (this.quizzes != null) {
          //  Iterate the Quiz Array
          this.quizzes.forEach((value) => {
            //  Check any Quiz is available in this Category or not
            if (cid == value.category.cid) {
              //  Show Alert
              this.snack.open(
                'Plz Delete all the Papers under this Subject',
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
          //  Delete Category
          this._category.deleteCategory(cid).subscribe(
            (data: any) => {
              // Reload the page after deleting
              window.location.reload();
              // Filter the Subjects which is not in the Database with their Id
              this.categories = this.categories.filter(
                (category: any) => category.cid != cid
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

//  // Delete all the quiz under this category
//  this.quizzes.forEach((quizElem) => {
//   // console.log(cid);
//   //  Check the perticular Category Id match with Under this Quizzes Category Id
//   if (cid == quizElem.category.cid) {
//     // alert("hello");
//     // console.log(this.quizzes[index].category.cid);

//     this.questions.forEach((questionElem) => {
//       if (quizElem.qId == questionElem.quiz.qId) {
//         this._question.deleteQuestion(questionElem.quesId).subscribe(
//           (data: any) => {
//             // Reload the page after deleting
//             // window.location.reload();
//             // Filter the Question which is not in the Database with their Id
//             this.questions = this.questions.filter(
//               (question: any) => question.quesId != questionElem.quesId
//             );
//             // console.log("Deleted");
//           },
//           (error) => {
//             // Swal
//             //   .fire
//               // 'Error !!',
//               // 'Error While Deleting Question',
//               // 'error'
//             //   ();
//           }
//         );
//       }
//     });
//     //  For Delete Quiz
//     this._quiz.deleteQuiz(quizElem.qId).subscribe(
//       (data: any) => {
//         if (data == null) {
//           return;
//         }
//         //  Deleted
//         this.quizzes = this.quizzes.filter(
//           (quiz: any) => quiz.qid != quizElem.qId
//         );
//       },
//       (error) => {
//         // Swal.fire('Error !!', 'Error While Deleting Data', 'error');
//       }
//     );
//     //  Break for Exit from Loop
//     // break;
//   }
// });
