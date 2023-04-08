import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  //  HTTP Client Constructor
  constructor(private _http: HttpClient) {}

  // Get all Questions of Quiz
  public getQuestionsOfQuiz(qid: any) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  // Get all Questions of Quiz For Test
  public getQuestionsOfQuizForTest(qid: any) {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //  Add Question
  public addQuestion(question: any) {
    return this._http.post(`${baseUrl}/question/`, question);
  }

  //  Delete Question
  public deleteQuestion(questionId: any) {
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }

  //  Get the Single Question
  public getQuestion(questionId: any) {
    return this._http.get(`${baseUrl}/question/${questionId}`);
  }

  //  Update Question
  public updateQuestion(question: any) {
    return this._http.put(`${baseUrl}/question/`, question);
  }

  // Evaluate Quiz
  public evalQuiz(questions: any) {
    return this._http.post(`${baseUrl}/question/eval-quiz`, questions);
  }
}
