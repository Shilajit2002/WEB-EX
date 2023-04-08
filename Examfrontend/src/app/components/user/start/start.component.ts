import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  qid: any;
  R = 0;
  RC: String = 'rgb(13, 150, 13)';

  isSubmit = false;

  // For Time
  date: Date | undefined;
  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  timerId: any;

  timer: any;

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

  // Questions Object
  questions = [
    {
      quesId: null,
      content: null,
      image: null,
      option1: null,
      option2: null,
      option3: null,
      option4: null,
      answer: null,
      givenAnswer: null,
    },
  ];

  // For Result
  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;

  name: string | undefined;

  err:boolean | undefined;

  grade: any;
  status = 'Pass';

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    public login: LoginService,
    private _quiz: QuizService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestions();
    this.loadQuiz();
    this.timerId = this.getTime();
    this.err=true;
    // if (this.err) {
    //   this.errorNewWindowOpen();
    // }
  }

  preventBackButton() {
    history.pushState(null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, location.href);
    });
  }

  errorNewWindowOpen() {
    if (this.err) {
      var a = 0;
      function addEvent(obj: any, evt: any, fn: any) {
        if (obj.addEventListener) {
          obj.addEventListener(evt, fn, false);
        } else if (obj.attachEvent) {
          obj.attachEvent('on' + evt, fn);
        }
      }
      if (a == 5) {
        this.evalPaper();
      }
      addEvent(document, 'mouseout', function (e: any) {
        e = e ? e : window.event;
        var from = e.relatedTarget || e.toElement;
        if (!from || from.nodeName == 'HTML') {
          a++;
          // stop your drag event here
          // for now we can just use an alert
          Swal.fire({
            icon: 'info',
            title: `You have moved ${a-1} times from window`,
          });
        }
      });
    }
  }

  loadQuiz() {
    //  Load the active Quiz of Perticular Category
    this._quiz.getQuiz(this.qid).subscribe(
      //  For Data
      (data: any) => {
        //  Get Quiz Data from the Backend
        this.quizzes = data;
        this.quiz = this.quizzes;

        this.timer = this.quiz.numberOfQuestions * 2 * 60;
      },
      //  For Error
      (error) => {
        // console.log(error);
      }
    );
  }

  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        // this.questions.forEach((q: any) => {
        //   q['givenAnswer'] = '';
        // });
        console.log(this.questions);
        this.startTimer();
      },
      (error) => {
        // console.log(error);
      }
    );
  }

  getTime() {
    return setInterval(() => {
      this.date = new Date();
      this.hour = this.date.getHours();
      this.minute = this.date.getMinutes();
      this.second = this.date.getSeconds();
    }, 1000);
  }

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }

  submitPaper() {
    this.err = false;
    Swal.fire({
      title: 'Do you want to Submit the Paper?',
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      showDenyButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalPaper();
      } else {
        this.err = true;
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      // Code
      if (this.timer <= 0) {
        this.evalPaper();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = Math.floor(this.timer - mm * 60);
    return `${mm} min : ${ss} sec`;
  }

  evalPaper() {
    this.isSubmit = true;
    this.err=false;
    // Server
    this._question.evalQuiz(this.questions).subscribe(
      (data: any) => {
        // console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswer = data.correctAnswer;
        this.attempted = data.attempted;

        // Grade Calculation
        let val = (this.marksGot / this.quiz.maxMarks) * 100;

        if (val >= 90) {
          this.grade = 'O';
        } else if (val >= 80) {
          this.grade = 'E';
        } else if (val >= 70) {
          this.grade = 'A';
        } else if (val >= 60) {
          this.grade = 'B';
        } else if (val >= 50) {
          this.grade = 'C';
        } else if (val >= 40) {
          this.grade = 'D';
        } else {
          this.grade = 'F';
          this.status = 'Fail';
        }
      },
      (error) => {
        // console.log(error);
      }
    );
    // // Calculation
    // this.questions.forEach((q) => {
    //   if (q.givenAnswer == q.answer) {
    //     this.correctAnswer++;
    //     let marksSingle = this.quiz.maxMarks / this.quiz.numberOfQuestions;
    //     this.marksGot += marksSingle;
    //   }
    //   if (q.givenAnswer.trim() != '') {
    //     this.attempted++;
    //   }
    // });
    // console.log(this.correctAnswer);
    // console.log(this.marksGot);
    // console.log(this.attempted);
  }

  // Print Page
  printPage(divName: any) {
    const printContents = document.getElementById(divName)?.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = `${printContents}`;
    window.print();
    document.body.innerHTML = originalContents;
  }
}
